module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json');
    qunit: {
      files: ['test/**/*.html']
    },
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('default', ['qunit']);
};
