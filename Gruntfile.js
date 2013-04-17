module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // qunit: {
    //   files: ['test/**/*.html']
    // },
    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:8000/visumon-tests.html'
          ],
        },
      },
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.',
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['test', 'qunit']);
  grunt.registerTask('default', ['test', 'qunit']);
};
