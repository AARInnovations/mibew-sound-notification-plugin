<?php
/*
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

/**
 * @file The main file of AARInnovations:SoundNotification plugin.
 */

namespace AARInnovations\Mibew\Plugin\SoundNotification;

use Mibew\EventDispatcher\EventDispatcher;
use Mibew\EventDispatcher\Events;
use Symfony\Component\HttpFoundation\Request;

/**
 * The main plugin's file definition.
 *
 * It only attaches needed CSS and JS files to chat windows.
 */
class Plugin extends \Mibew\Plugin\AbstractPlugin implements \Mibew\Plugin\PluginInterface
{
    /**
     * List of the plugin configs.
     *
     * @var array
     */
    protected $config;

    /**
     * Indicates if the plugin was initialized correctly.
     *
     * @var boolean
     */
    protected  $initialized = false;

    /**
     * Class constructor.
     *
     * @param array $config List of the plugin config. 
     */
    public function __construct($config)
    {
        parent::__construct($config + array('new_thread' => true));
        $this->initialized = true;
    }

    /**
     * The main entry point of a plugin.
     */
    public function run()
    {
        // Attach CSS and JS files of the plugin to chat window.
        $dispatcher = EventDispatcher::getInstance();
        $dispatcher->attachListener(Events::PAGE_ADD_JS, $this, 'attachJsFiles');
    }

    /**
     * Event handler for "pageAddJS" event.
     *
     * @param array $args
     */
    public function attachJSFiles(&$args)
    {
        $need_users_plugin = $this->needUsersPlugin($args['request']);

        if ($need_users_plugin) {
            $base_path = $this->getFilesPath();
            $args['js'][] = $base_path . '/vendor/ion-sound/ion.sound.min.js';

            $args['js'][] = $base_path . '/js/users_plugin.js';
        }
    }

    /**
     * Specify version of the plugin.
     *
     * @return string Plugin's version.
     */
    public static function getVersion()
    {
        return '1.0.0';
    }

    /**
     * Specify dependencies of the plugin.
     *
     * @return array List of dependencies
     */
    public static function getDependencies()
    {
        // This plugin does not depend on others so return an empty array.
        return array();
    }

    /**
     * Checks if the JS part for users page should be attached.
     *
     * @param Request $request Incoming request
     * @return boolean
     */
    protected function needUsersPlugin(Request $request)
    {
        return $request->attributes->get('_route') == 'users' && $this->config['new_thread'];
    }
} 
