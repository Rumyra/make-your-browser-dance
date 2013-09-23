(function () {

  var
    audio = document.getElementById( 'audio' ),
    lights = document.getElementById('lights').getElementsByTagName('li'),
    dancer,kick;

  function switchedLight(ele,onOff) {
    var colour;
    if (onOff) {
      colour = 'rgba(0,0,0,0)';
    } else {
      colour = 'rgba(0,0,0,0.7)';
    }
    var gradient = '-webkit-radial-gradient(center,'+colour+',rgba(0,0,0,1))';
    ele.style.backgroundImage=gradient;
  }

  function switchBorder(ele,onOff) {
    var opacity;
    if (onOff) {
      opacity = '0.4';
    } else {
      opacity = '0.6';
    }
  }

  /*
   * Dancer.js magic
   */
  Dancer.setOptions({
    flashSWF : '../../lib/soundmanager2.swf',
    flashJS  : '../../lib/soundmanager2.js'
  });

  dancer = new Dancer();
  // kick = dancer.createKick({
  //   onKick: function () {
  //     switchedLight(lights[0],true);
  //   },
  //   offKick: function () {
  //     switchedLight(lights[0],false);
  //   }
  // }).on();

  

  dancer
    .load( audio );


  dancer.bind( 'update', function() {
      var spectrum = this.getSpectrum();
      count = 512;
      for ( var i = 0, l = spectrum.length; i < l && i < count; i++ ) {
        document.getElementById("spectrum").innerHTML= spectrum[i];
        }
    });
  dancer.bind( 'update', function() {
      var wave = this.getWaveform();
      count = 1024;
      for ( var i = 0, l = wave.length; i < l && i < count; i++ ) {
        document.getElementById("wave").innerHTML= wave[i];
        }
    });
  dancer.bind( 'update', function() {

    for (var i = 0; i <= 40; i++) {
      var frequency = this.getFrequency(i*2.5);
      var frequency = frequency*100;
      if (frequency > 1) {
        switchedLight(lights[i],true);
      } else {
        switchedLight(lights[i],false);
      }
    }
      // var frequency = this.getFrequency(10);
      // var frequency = frequency*100;
      // document.getElementById("frequency").innerHTML= frequency;
      // if (frequency > 1) {
      //   switchedLight(lights[2],true);
      // } else {
      //   switchedLight(lights[2],false);
      // }
      // count = 512;
      // for ( var i = 0, l = frequency.length; i < l && i < count; i++ ) {
      //   document.getElementById("frequency").innerHTML= frequency[i];
      //   }
    });

  Dancer.isSupported() || loaded();
  !dancer.isLoaded() ? dancer.bind( 'loaded', loaded ) : loaded();

  /*
   * Loading
   */

  function loaded () {
    var
      loading = document.getElementById( 'loading' ),
      anchor  = document.createElement('A'),
      supported = Dancer.isSupported(),
      p;

    anchor.appendChild( document.createTextNode( supported ? 'Play!' : 'Close' ) );
    anchor.setAttribute( 'href', '#' );
    loading.innerHTML = '';
    loading.appendChild( anchor );

    if ( !supported ) {
      p = document.createElement('P');
      p.appendChild( document.createTextNode( 'Your browser does not currently support either Web Audio API or Audio Data API. The audio may play, but the visualizers will not move to the music; check out the latest Chrome or Firefox browsers!' ) );
      loading.appendChild( p );
    }

    anchor.addEventListener( 'click', function () {
      dancer.play();
      document.getElementById('loading').style.display = 'none';
    });
  }

  // For debugging
  window.dancer = dancer;

})();
