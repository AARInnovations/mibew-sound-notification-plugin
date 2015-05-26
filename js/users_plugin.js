/*!
 * This file is a part of Mibew Sound Notification Plugin.
 *
 * Copyright 2015 AAR Innovations (http://aar-innovations.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (Mibew, $) {
    // Initialize separated Marionette.js module for the plugin.
    var module = Mibew.Application.module(
        'SoundNotificationPlugin',
        {startWithParent: false}
    );

    Mibew.Application.on({
        'start': function() {
            // Run the plugin AFTER the main application started
            module.start();
        },
        'stop': function() {
            // Stop the plugin BEFORE the main application stopped
            module.stop();
        }
    });

    var config = {
        sounds: [
            {
                name: "bell_ring"
            }
        ],
        path: "/mibew/plugins/AARInnovations/Mibew/Plugin/SoundNotification/sound/",
        loop: true,
        volume: 1.0
    };
    
    module.addInitializer(function() {
        Mibew.Objects.Collections.threads.on('add', function(model) {
            $.ionSound(config);
            $.ionSound.play("bell_ring");
            $(document).mousemove(function(event){
              if($.ionSound){
                $.ionSound.stop("bell_ring");
              }
            });
        });
    });
})(Mibew, jQuery); 
