module.exports = {
  planetSchema: {
    title: 'Planets Schema',
    type: 'object',
    required: ['name',
      'rotation_period',
      'orbital_period',
      'diameter',
      'climate',
      'gravity',
      'terrain',
      'surface_water',
      'population',
      'residents',
      'films',
      'created',
      'edited',
      'url'],
    properties: {
      'name': {
        type: 'string',
        minLength: 2
      },
      'rotation_period': {
        type: 'string',
        minLength: 1
      },
      'orbital_period': {
        type: 'string',
        minLength: 2
      },
      'diameter': {
        type: 'string',
        minLength: 1
      },
      'climate': {
        type: 'string',
        minLength: 3
      },
      'gravity': {
        type: 'string',
        minLength: 1
      },
      'terrain': {
        type: 'string',
        minLength: 3
      },
      'surface_water': {
        type: 'string',
        minLength: 1
      },
      'population':{
        type: 'string',
        minLength: 1
      },
      'residents':{
        type: 'array',
        uniqueItems: true,
        minItems: 0,
        items: {
          type: 'string'
        }
      },
      'films':{
        type: 'array',
        uniqueItems: true,
        minItems: 0,
        items: {
          type: 'string'
        }
      },
      'created':{
        type: 'string',
        minLength: 25
      },
      'edited':{
        type: 'string',
        minLength: 25
      },
      'url': {
        type: 'string',
        minLength: 20
      }
    }
  }
}
