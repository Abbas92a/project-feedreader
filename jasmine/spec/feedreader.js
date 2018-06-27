/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of the tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS feeds definitions,
		 * the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* this test is to make sure that the
         * allFeeds variable has been defined and that it is not empty.
         */
        it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
        });


        /* this test is to loop through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
				 it('each feed have its URL defined', function() {
					 for (let i=0; i<allFeeds.length; i++) {
						 expect(allFeeds[i].url).toBeDefined();
						 expect(allFeeds[i].url.length).not.toBe(0);
					 }
				 });

        /* this test is to loop through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
				 it('each feed have its name defined', function() {
					 for (let i=0; i<allFeeds.length; i++) {
						 expect(allFeeds[i].name).toBeDefined();
						 expect(allFeeds[i].name.length).not.toBe(0);
					 }
				 });
    });

    describe('The menu', function() {
			let menuIcon = $('.menu-icon-link');
			 		body = $('body'),
			 		menu = $('.slide-menu'),

			/* this test is to ensure the menu element is
			* hidden by default.
			*/
      it('is hidden by default', function() {
        expect(body[0].classList).toContain('menu-hidden');
        // expect(menu).toHaveCss({"transform": "translate3d(-12em, 0, 0)"});
        expect(menu.css('transform')).toEqual('matrix(1, 0, 0, 1, -192, 0)'); //"matrix(1, 0, 0, 1, -192, 0)" is equivalent to "translate3d(-12em, 0, 0)"
      });

			/* this test ensures that the menu changes
			* visibility when the menu icon is clicked.
			*/
			it('change visibility in respose to clicking the icon', function() {
				menuIcon.trigger( "click" );
				expect(body.hasClass('menu-hidden')).toBe(false);

				menuIcon.trigger( "click" );
				expect(body.hasClass('menu-hidden')).toBe(true);
			});
    });

    describe('Initial Entries', function() {
			/* this test ensures that when the loadFeed
			* function is called and completes its work, there is at least
			* a single .entry element within the .feed container.
			*/
			beforeEach(function(done) {
				loadFeed(0, function() {
					done();
				});
			});

			it('there is at least a single entry within the feed', function(done) {
				expect(document.querySelector('.entry')).not.toBeNull();
				done();
			});
    });

	 describe('New Feed Selection', function() {
		 /* this test ensures that when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		 let oldFeed, newFeed;
		beforeEach(function(done) {
			 $('.feed').empty();
 			loadFeed(0, function() {
				oldFeed = $('.feed').html();

				loadFeed(1, function() {
					newFeed =  $('.feed').html();
					done();
				});
 			});

 		});

 		it('content should change when a new feed is loaded', function(done) {
 			expect(oldFeed).not.toEqual(newFeed);
 			done();
 		});
	 });

}());
