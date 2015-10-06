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

  app.displayInstalledToast = function () {
    document.querySelector('#caching-complete').show();
  };

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function () {
    console.log('Our app is ready to rock!');
    app.goHome();
    window.setInterval(app.doRefresh, 3 * 60 * 1000);
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


  app.goHome = function () {
    app.route = 'home';
    app.doRefresh();
  };

  app.goDiagrams = function () {
    app.route = 'diagrams';
  };

  app.doRefresh = function () {
    app.weatherurl = app.buildUrl();
  };

  app.buildUrl = function () {
    var url = 'https://wettercentral.appspot.com/weatherstation/read?utf8&ext&locations=';

    // Workaround für Internet Explorer
    if (app.settings === undefined) {
      return url+'tegelweg8,forstweg17,ochsengasse,herzo';
    }

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

  app.initializeSettings = function () {
    app.settings = {
      weatherstations: [
        {
          id: 'tegelweg8',
          location: 'Paderborn',
          visible: true,
          images: ['https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=426012227&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=1&oid=183626445&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=2118924146&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=1&oid=747368525&format=image']
        },
        {
          id: 'bali',
          location: 'Bad Lippspringe',
          visible: true,
          images: ['https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=376041681&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=1959064763&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=1408859930&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=1754363161&format=image']
        },
        {
          id: 'leoxity',
          location: 'Leopoldshöhe',
          visible: true,
          images: ['https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=1205500547&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=75598496&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=255192281&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=1747103714&format=image']
        },
        {
          id: 'forstweg17',
          location: 'Bonn',
          visible: true,
          images: ['https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=529970705&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=1&oid=1771661938&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=1706278998&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=1&oid=2014590801&format=image']
        },
        {
          id: 'elb',
          location: 'Magdeburg',
          visible: true,
          images: ['https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=2090578754&format=image',
          'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=808641441&format=image',
          'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=439313787&format=image']
        },
        {
          id: 'herzo',
          location: 'Herzogenaurach',
          visible: true,
          images: ['https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=1655654633&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=1843697553&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=1089204796&format=image']
        },
        {
          id: 'ochsengasse',
          location: 'Freiburg',
          visible: true,
          images: ['https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=145042526&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=1045869484&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=1&oid=1650739963&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=2&oid=1557105940&format=image',
            'https://wetterimages.appspot.com/weatherstation/image?sheet=1&oid=1963429675&format=image']
        }
      ]
    };
  };

})
(document);
