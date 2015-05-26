var bower = require('bower'),
    eventStream = require('event-stream'),
    gulp = require('gulp'),
    chmod = require('gulp-chmod'),
    zip = require('gulp-zip'),
    tar = require('gulp-tar'),
    gzip = require('gulp-gzip'),
    rename = require('gulp-rename');

// Installs bower dependencies
gulp.task('bower', function(callback) {
    bower.commands.install([], {}, {})
        .on('error', function(error) {
            callback(error);
        })
        .on('end', function() {
            callback();
        });
});

gulp.task('prepare-release', ['bower'], function() {
    var version = require('./package.json').version;

    return eventStream.merge(
        getSources()
            .pipe(zip('sound-notification-plugin-' + version + '.zip')),
        getSources()
            .pipe(tar('sound-notification-plugin-' + version + '.tar'))
            .pipe(gzip())
    )
    .pipe(chmod(0644))
    .pipe(gulp.dest('release'));
});

// Builds and packs plugins sources
gulp.task('default', ['prepare-release'], function() {
    // The "default" task is just an alias for "prepare-release" task.
});

/**
 * Returns files stream with the plugin sources.
 *
 * @returns {Object} Stream with VinylFS files.
 */
var getSources = function() {
    return gulp.src([
            'Plugin.php',
            'README.md',
            'LICENSE',
            'js/*',
            'vendor/ion.sound/ion.sound.js'
        ],
        {base: './'}
    )
    .pipe(rename(function(path) {
        path.dirname = 'AARInnovations/Mibew/Plugin/SoundNotification/' + path.dirname;
    }));
}
