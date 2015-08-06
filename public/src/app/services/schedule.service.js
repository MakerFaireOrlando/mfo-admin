class ScheduleService {
  constructor($resource) {
    'ngInject'
    this.resource = $resource
      ( '/api/v1/schedule'
      , { year: '@year'
        }
      , { get:
          { method: 'GET'
          , url: '/api/v1/schedule/:year'
          }
        }
      )
  }
  get(year) {
    return this.resource.get({year: year})
  }
}

export default ScheduleService
