const THREE = require('../lib/three.min');
const terrainVert = require('../shaders/terrain.glsl');
const terrainSnowFrag = require('../shaders/terrainSnow.glsl');
// const texture = require('../lib/text');
// console.log(88888);
// console.log(terrainVert);

const Edge = {
    NONE: 0,
    TOP: 1,
    LEFT: 2,
    BOTTOM: 4,
    RIGHT: 8
  };
const Terrain = function(heightData, worldWidth, levels, resolution){
    THREE.Object3D.call( this );

    this.worldWidth = ( worldWidth !== undefined ) ? worldWidth : 1024;
    this.levels = ( levels !== undefined ) ? levels : 6;
    this.resolution = ( resolution !== undefined ) ? resolution : 128;
    this.heightData = heightData;
    // Offset is used to re-center the terrain, this way we get the greates detail
    // nearest to the camera. In the future, should calculate required detail level per tile
    this.offset = new THREE.Vector3( 0, 0, 0 );

    // Which shader should be used for rendering
    // this.fragShaders = [terrainFrag, terrainSnowFrag, terrainToonFrag];
    this.fragShader = terrainSnowFrag;

    // Create geometry that we'll use for each tile, just a standard plane
    this.tileGeometry = new THREE.PlaneGeometry( 1, 1, this.resolution, this.resolution );
    // Place origin at bottom left corner, rather than center
    var m = new THREE.Matrix4();
    m.makeTranslation( 0.5, 0.5, 0 );
    this.tileGeometry.applyMatrix( m );

    // Create collection of tiles to fill required space
    /*jslint bitwise: true */
    var initialScale = this.worldWidth / Math.pow( 2, levels );

    // Create center layer first
    //    +---+---+
    //    | O | O |
    //    +---+---+
    //    | O | O |
    //    +---+---+
    this.createTile( -initialScale, -initialScale, initialScale, Edge.NONE );
    this.createTile( -initialScale, 0, initialScale, Edge.NONE );
    this.createTile( 0, 0, initialScale, Edge.NONE );
    this.createTile( 0, -initialScale, initialScale, Edge.NONE );

    // Create "quadtree" of tiles, with smallest in center
    // Each added layer consists of the following tiles (marked 'A'), with the tiles
    // in the middle being created in previous layers
    // +---+---+---+---+
    // | A | A | A | A |
    // +---+---+---+---+
    // | A |   |   | A |
    // +---+---+---+---+
    // | A |   |   | A |
    // +---+---+---+---+
    // | A | A | A | A |
    // +---+---+---+---+
    for ( var scale = initialScale; scale < worldWidth; scale *= 2 ) {
      this.createTile( -2 * scale, -2 * scale, scale, Edge.BOTTOM | Edge.LEFT );
      this.createTile( -2 * scale, -scale, scale, Edge.LEFT );
      this.createTile( -2 * scale, 0, scale, Edge.LEFT );
      this.createTile( -2 * scale, scale, scale, Edge.TOP | Edge.LEFT );

      this.createTile( -scale, -2 * scale, scale, Edge.BOTTOM );
      // 2 tiles 'missing' here are in previous layer
      this.createTile( -scale, scale, scale, Edge.TOP );

      this.createTile( 0, -2 * scale, scale, Edge.BOTTOM );
      // 2 tiles 'missing' here are in previous layer
      this.createTile( 0, scale, scale, Edge.TOP );

      this.createTile( scale, -2 * scale, scale, Edge.BOTTOM | Edge.RIGHT );
      this.createTile( scale, -scale, scale, Edge.RIGHT );
      this.createTile( scale, 0, scale, Edge.RIGHT );
      this.createTile( scale, scale, scale, Edge.TOP | Edge.RIGHT );
    }
};

Terrain.prototype = Object.create( THREE.Object3D.prototype );

  Terrain.prototype.createTile = function ( x, y, scale, edgeMorph ) {
    var terrainMaterial = this.createTerrainMaterial( this.heightData,
                                                      this.offset,
                                                      new THREE.Vector2( x, y ),
                                                      scale,
                                                      this.resolution,
                                                      edgeMorph );
    var plane = new THREE.Mesh( this.tileGeometry, terrainMaterial );
    this.add( plane );
  };

  Terrain.prototype.createTerrainMaterial = function( heightData, globalOffset, offset, scale, resolution, edgeMorph ) {
    // Is it bad to change this for every tile?
    // terrainVert.define( "TILE_RESOLUTION", resolution.toFixed(1) );
    return new THREE.ShaderMaterial( {
      uniforms: {
        uEdgeMorph: { type: "i", value: edgeMorph },
        uGlobalOffset: { type: "v3", value: globalOffset },
        uHeightData: { type: "t", value: heightData },
        //uGrass: { type: "t", value: texture.grass },
        // uRock: { type: "t", value: texture.rock },
        //uSnow: { type: "t", value: texture.snow },
        uTileOffset: { type: "v2", value: offset },
        uScale: { type: "f", value: scale }
      },
      vertexShader: terrainVert,
      fragmentShader: this.fragShader,
      transparent: true
    } );
  };

  export default Terrain;
