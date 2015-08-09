/*
 Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */


(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  app.properties = {
    settings: Object
  };

  app.displayInstalledToast = function () {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function () {
    console.log('Our app is ready to rock!');
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function () {
    app.goHome();
    app.doRefresh();
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  addEventListener('paper-header-transform', function (e) {
    var appName = document.querySelector('.app-name');
    var middleContainer = document.querySelector('.middle-container');
    var bottomContainer = document.querySelector('.bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
    var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1 - maxMiddleScale)) + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.onMenuSelect = function () {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  app.initializeSettings = function () {
    app.settings = {
      weatherstations: [
        {
          id: 'tegelweg8',
          location: 'Paderborn',
          visible: true
        },
        {
          id: 'bali',
          location: 'Bad Lippspringe',
          visible: true
        },
        {
          id: 'leoxity',
          location: 'Leopoldshöhe',
          visible: true
        },
        {
          id: 'forstweg17',
          location: 'Bonn',
          visible: false
        },
        {
          id: 'ochsengasse',
          location: 'Freiburg',
          visible: true
        },
        {
          id: 'herzo',
          location: 'Herzogenaurach',
          visible: true
        }
      ]
    };
  };


  app.goHome = function () {
    app.route = 'home';
  };

  app.buildUrl = function () {
    var url = 'http://wettercentral.appspot.com/weatherstation/read?utf8&ext&locations=';
    var stations = app.settings.weatherstations;
    var first = true;
    for (var i in stations) {
      if (stations[i].visible) {
        if (!first) {
          url += ',';
        }
        first = false;
        url += stations[i].id;
      }
    }
    url += '&' + new Date();
    return url;
  };

  app.doRefresh = function () {
    app.weatherurl = app.buildUrl();
//    app.weatherurl = 'http://wettercentral.appspot.com/weatherstation/read?locations=tegelweg8,bali,leoxity,forstweg17,ochsengasse,herzo&utf8&ext&' + new Date();
  };

})
(document);
