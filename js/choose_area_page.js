const chooseAreaPage = new Vue({
  el: '#chooseAreaPage',
  data: {
    currentCinemaMapPin: 'Oulu',
    currentCinemaDescription: 'Oulu',
    cinemas: ['Rovaniemi', 'Oulu', 'Tampere', 'Turku', 'Helsinki'],
    showChooseArea: false,
    currentBackgroundPoster: nowShowingMovies[0].posterUrlPath,
    currentMovieTitleLine1: nowShowingMovies[0].title[0],
    currentMovieTitleLine2: nowShowingMovies[0].title[1],
    currentMovieReleaseDate: nowShowingMovies[0].releaseDate,
    currentMovieCategory: nowShowingMovies[0].category,
    currentMovieImdbScore: nowShowingMovies[0].imdbScore,
    currentMovieRunningTime: nowShowingMovies[0].runningTime,
    currentMovieDetailPoster: nowShowingMovies[0].detailUrlPath,
    currentMovieUrlPath: nowShowingMovies[0].videoUrlPath
  },
  methods: {
    setActiveCinema: function(cinema) {
      const previousSelectedCinema = this.$refs[this.currentCinemaMapPin];
      const newlySelectedCinema = this.$refs[cinema];

      this.currentCinemaMapPin = cinema;
      const tl = new TimelineMax();
      tl
        .fromTo(
          previousSelectedCinema,
          0.7,
          { bottom: 0, opacity: 1 },
          { bottom: -50, opacity: 0, ease: Power4.easeOut }
        )
        .call(() => (this.currentCinemaDescription = cinema))
        .fromTo(
          newlySelectedCinema,
          0.7,
          { bottom: -50, opacity: 0 },
          { bottom: 0, opacity: 1 }
        );
    },
    onClickChooseArea: function() {
      this.unmount(() => {
        this.showChooseArea = false;
        chooseSchedule.updateState(this);
        chooseSchedule.mount();
      });
    },
    onClickBackToMovieDetail: function() {
      this.unmount(() => {
        this.showChooseArea = false;
        movieDetail.mount();
      });
    },
    mount: function() {
      this.showChooseArea = true;
      const { chooseAreaPage } = this.$refs;
      TweenMax.fromTo(chooseAreaPage, 1.5, { y: 200, opacity: 0 }, { y: 0, ease: Expo.easeOut, opacity: 1 });

      const currentActiveCinemaInfoRef = this.$refs[
        this.currentCinemaDescription
      ];
      const { mapContainer, footer } = this.$refs;

      TweenMax.fromTo(
        currentActiveCinemaInfoRef,
        1,
        { y: 50, opacity: 0, ease: Power4.easeOut },
        { y: 0, opacity: 1, ease: Power4.easeOut }
      );
      TweenMax.fromTo(
        mapContainer,
        1,
        { y: 50, opacity: 0, ease: Power4.easeOut },
        { y: 0, opacity: 1, ease: Power4.easeOut }
      );
      TweenMax.fromTo(
        footer,
        1,
        { y: 50, opacity: 0, ease: Power4.easeOut },
        { y: 0, opacity: 1, ease: Power4.easeOut }
      );
    },
    unmount: function(onComplete) {
      const currentActiveCinemaInfoRef = this.$refs[
        this.currentCinemaDescription
      ];
      const { mapContainer, footer } = this.$refs;

      TweenMax.fromTo(
        currentActiveCinemaInfoRef,
        1,
        { y: 0, opacity: 1, ease: Power4.easeOut },
        { y: 50, opacity: 0, ease: Power4.easeOut }
      );
      TweenMax.fromTo(
        mapContainer,
        1,
        { y: 0, opacity: 1, ease: Power4.easeOut },
        { y: 50, opacity: 0, ease: Power4.easeOut }
      );
      TweenMax.fromTo(
        footer,
        1,
        { y: 0, opacity: 1, ease: Power4.easeOut },
        { y: 50, opacity: 0, ease: Power4.easeOut, onComplete: onComplete }
      );
    },
    updateState: function({
      currentBackgroundPoster,
      currentMovieTitleLine1,
      currentMovieTitleLine2,
      currentMovieReleaseDate,
      currentMovieCategory,
      currentMovieImdbScore,
      currentMovieRunningTime,
      currentMovieDetailPoster,
      currentMovieUrlPath
    }) {
      this.currentBackgroundPoster = currentBackgroundPoster;
      this.currentMovieTitleLine1 = currentMovieTitleLine1;
      this.currentMovieTitleLine2 = currentMovieTitleLine2;
      this.currentMovieReleaseDate = currentMovieReleaseDate;
      this.currentMovieCategory = currentMovieCategory;
      this.currentMovieImdbScore = currentMovieImdbScore;
      this.currentMovieRunningTime = currentMovieRunningTime;
      this.currentMovieDetailPoster = currentMovieDetailPoster;
      this.currentMovieUrlPath = currentMovieUrlPath;
    },
    onMenuClick: function(){
      const { frontLayer } = this.$refs;
      TweenMax.set(frontLayer, {cursor: 'pointer'});
      const tl = new TimelineMax();
      tl.to(frontLayer, 0.6, {
        scale: 0.5, xPercent: '-12%', rotationY: 15,
        ease: Expo.easeInOut
      })
        .staggerFromTo('.menuItem', 0.4,
          {y: 50, opacity: 0, ease: Expo.easeOut},
          {y: 0, opacity: 1, ease: Expo.easeOut }, 0.2, '-=0.3')
        .call(() => {this.onMenuShow = true})
    },
    closeMenu: function(){
      if(this.onMenuShow){
        const { frontLayer } = this.$refs;
        TweenMax.set(frontLayer, {cursor: 'initial'});
        const tl = new TimelineMax();
        tl
          .to('.menuItem', 0.4,
            {y: -50, opacity: 0, ease: Expo.easeOut })
          .to(frontLayer, 0.6, {
            scale: 1, xPercent: '0', rotationY: 0,
            ease: Expo.easeInOut
          }, '-=0.4')

          .call(() => {this.onMenuShow = false})
      }
    }
  },
  watch: {}
});
