class DateService {
  constructor($resource) {
    this.resource = $resource
      ( '/api/v1/dates/:year'
      , { year: '@year'
        }
      , { get:
          { method: 'GET'
          , isArray: true
          }
        }
      )
  }
  get(year){
    return this.resource.get({year: year})
  }
}

export default DateService;
