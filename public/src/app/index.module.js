import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import MainCtrl from './main/main.controller';
import AddEventModalCtrl from '../app/components/add-event-modal/add-event-modal.controller';
import NavbarDirective from '../app/components/navbar/navbar.directive';
import ScheduleService from '../app/services/schedule.service'
import DateService from '../app/services/date.service'

angular.module('mfo-admin', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ui.router',
  'ui.bootstrap'
])
  .config(config)

  .config(routerConfig)

  .run(runBlock)
  .controller('MainCtrl', MainCtrl)
  .controller('AddEventModalCtrl', AddEventModalCtrl)
  .directive('acmeNavbar', () => new NavbarDirective())
  .service('Schedule', ScheduleService)
  .service('DateService', DateService)
