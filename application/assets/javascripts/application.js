/*jslint browser: true*/
/*encoding: utf-8*/
(function () {
    "use strict";
    var $ = jQuery;

    /*
     * Hide address bar
     */
    $(window).load(function() {
        setTimeout(function() { window.scrollTo(0, 1) }, 100);
    });

    $(document).ready(function () {
        /*
         * Menu
         */
        $('header.main h1').on('click', function (event) {
            $('body').toggleClass('opened'); 
            return false;
        });
        /*
         * Enable slider
         */
        var container = document.getElementById('slider');
        window.slider = Swipe(container);
        /*
         * Swipe
         */
        $(".body.main").swipe({
            swipeLeft: function(event, direction, distance, duration, fingerCount) {
                if (0 < $('.internal .next').length) {
                    window.location = $('.internal .next').attr('href');
                }
            },
            swipeRight: function(event, direction, distance, duration, fingerCount) {
                if (0 < $('.internal .previous').length) {
                    window.location = $('.internal .previous').attr('href');
                }
            }
        });
        /*
         * Map
         */
        if (0 < $('#map').length) {
            var map, geolocate_button, cities;

            map = L.mapbox.map('map', 'examples.map-9ijuk24y', { zoomControl: false }).setView([46, 2], 6);

            /*
             * Disable zooming
             */
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();

            /*
             * Markers
             */
            cities = { 'Paris':            [ 48.5124, 2.2107 ],
                       'Lyon':             [ 45.4535, 4.5032 ],
                       'Strasbourg':       [ 48.3505, 7.4502 ],
                       'Mulhouse':         [ 47.4458, 7.2024 ],
                       'Clermont-Ferrand': [ 45.4659, 3.0456 ],
                       'Bordeaux':         [ 44.5016, 0.3446 ],
                       'Nantes':           [ 47.1305, 1.3310 ],
                       'Rennes':           [ 48.0653, 1.4046 ],
                       'Toulouse':         [ 3.3616, 1.2638 ],
                       'Lille':            [ 50.3814, 3.0348 ]
            };
            $.each(cities, function (city, coordinates) {
                var marker = L.marker(new L.LatLng(coordinates[0], coordinates[1]));
                marker.addTo(map);
            });

            /*
             * Geolocation
             */
            geolocate_button = document.getElementById('geolocate');

            if (!navigator.geolocation) {
                geolocate_button.parentNode.removeChild(geolocate_button);

            } else {
                geolocate.onclick = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    map.locate();
                };
            }

            map.on('locationfound', function (e) {
                map.fitBounds(e.bounds);

                map.markerLayer.setGeoJSON({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [e.latlng.lng, e.latlng.lat]
                    },
                    properties: {
                        'marker-color': '#000',
                        'marker-symbol': 'star-stroked'
                    }
                });
            });

            map.on('locationerror', function() {
                geolocate.innerHTML = 'position could not be found';
            });
        }
    });

})(jQuery)