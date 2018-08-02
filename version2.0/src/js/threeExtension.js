const THREE = require('../lib/three.min');
const ThreeExtension = {
    TextureLoader:TextureLoader
};
const RGBAFormat = 1023;
function LoadingManager( onLoad, onProgress, onError ) {
    var scope = this;
    var isLoading = false;
    var itemsLoaded = 0;
    var itemsTotal = 0;
    var urlModifier = undefined;
    this.onStart = undefined;
    this.onLoad = onLoad;
    this.onProgress = onProgress;
    this.onError = onError;
    this.itemStart = function ( url ) {
        itemsTotal ++;
        if ( isLoading === false ) {
            if ( scope.onStart !== undefined ) {
                scope.onStart( url, itemsLoaded, itemsTotal );
            }
        }
        isLoading = true;
    };

    this.itemEnd = function ( url ) {
        itemsLoaded ++;
        if ( scope.onProgress !== undefined ) {
            scope.onProgress( url, itemsLoaded, itemsTotal );
        }
        if ( itemsLoaded === itemsTotal ) {
            isLoading = false;
            if ( scope.onLoad !== undefined ) {
                scope.onLoad();
            }
        }
    };

    this.itemError = function ( url ) {
        if ( scope.onError !== undefined ) {
            scope.onError( url );
        }
    };

    this.resolveURL = function ( url ) {
        if ( urlModifier ) {
            return urlModifier( url );
        }
        return url;
    };

    this.setURLModifier = function ( transform ) {
        urlModifier = transform;
        return this;
    };
}

var DefaultLoadingManager = new LoadingManager();

function TextureLoader( manager ) {
    this.manager = ( manager !== undefined ) ? manager : DefaultLoadingManager;
}

Object.assign( TextureLoader.prototype, {
    crossOrigin: 'anonymous',
    load: function ( url, onLoad, onProgress, onError ) {
        var texture = new THREE.Texture();
        var loader = new THREE.ImageLoader( this.manager );
        loader.setCrossOrigin( this.crossOrigin );
        loader.setPath( this.path );
        loader.load( url, function ( image ) {
            texture.image = image;
            // JPEGs can't have an alpha channel, so memory can be saved by storing them as RGB.
            var isJPEG = url.search( /\.(jpg|jpeg)$/ ) > 0 || url.search( /^data\:image\/jpeg/ ) === 0;
            texture.format = isJPEG ? RGBFormat : RGBAFormat;
            texture.needsUpdate = true;
            if ( onLoad !== undefined ) {
                onLoad( texture );
            }
        }, onProgress, onError );
        return texture;
    },

    setCrossOrigin: function ( value ) {
        this.crossOrigin = value;
        return this;
    },

    setPath: function ( value ) {
        this.path = value;
        return this;
    }
} );



export default ThreeExtension;