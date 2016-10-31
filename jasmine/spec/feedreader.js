/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  describe('RSS Feeds', function() {
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    it('each feed has a url defined that is not empty', function(){
      for (var i = 0; i < allFeeds.length; i++){
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
      }
    });

    it('each feed has a name defined that is not empty', function(){
      for (var i = 0; i < allFeeds.length; i++){
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).not.toBe(0);
      }
    });
  });

  describe('The menu', function(){
    it('is hidden by default', function(){
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    it('changes visibility when the menu icon is clicked', function(){
      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  describe('Initial Entries', function(){
    beforeEach(function(done){
      loadFeed(0, done);
    });

    it('has at least a single .entry element in the .feed container after loadFeed called', function(done){
      expect($('.feed').children().find('article.entry').length).not.toBe(0);
      done();
    })
  });

  describe('News Feed Selection', function(){

    var loadedNewsFeed1;
    var loadedNewsFeed2;

    beforeEach(function(done){
      loadFeed(0,function(){
        loadedNewsFeed1 = $('.feed').html();
        loadFeed(1, function(){
          loadedNewsFeed2 = $('.feed').html();
          done();
        })
      })
    });

    it('content actually changes when a new feed is loaded via loadFeed function', function(done){
      expect(loadedNewsFeed1===loadedNewsFeed2).toBe(false);
      done();
    });

  });

}());
