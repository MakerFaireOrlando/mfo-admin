function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('schedule', {
      url: '/schedule',
      templateUrl: 'app/main/main.html'
    });

  $urlRouterProvider.otherwise('/schedule');
}

export default routerConfig;
