import Project from './types/Project';

const projects: Array<Project> = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/3274903/pexels-photo-3274903.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    name: 'Eventi',
    html_url: 'https://github.com/EnisMulic/Eventi',
    website: '',
    description:
      'An application for finding events neer you. Built in C# with a REST API and MVC pattern',
    tags: [
      'C#',
      '.NET Core',
      'MS SQL Server',
      'Docker',
      'REST API',
      'Refit',
      'MVC',
    ],
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    name: 'MSG - Z',
    html_url: 'https://github.com/EnisMulic/MSG-Z',
    website: '',
    description:
      'A discord utility bot written in python for automating administrative tasks',
    tags: [
      'Python',
      'PostgreSQL',
      'SQLAlchemy',
      'discord.py',
      'Alembic',
      'Beautiful Soup',
    ],
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/3333991/pexels-photo-3333991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    name: 'MSG - Z - API',
    html_url: 'https://github.com/EnisMulic/MSG-Z-API',
    website: '',
    description:
      'A Python RESTful api for handling MSG - Z configuration files',
    tags: ['Python', 'MongoDB', 'Flask', 'REST-X', 'Marshmallow', 'Docker'],
  },
  {
    id: 4,
    image:
      'https://images.pexels.com/photos/3513239/pexels-photo-3513239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    name: 'Lyra',
    html_url: 'https://github.com/EnisMulic/Lyra',
    website: '',
    description:
      'An application for streaming music built in C# with a REST API, WinForms for the admin panel and Xamarin for the client side',
    tags: ['C#', 'MSSQLServer', 'Docker', 'WinForms', 'Xamarin', 'REST API'],
  },
  {
    id: 5,
    image:
      'https://images.pexels.com/photos/3309869/pexels-photo-3309869.jpeg?cs=srgb&dl=pexels-andre-estevez-3309869.jpg&fm=jpg',
    name: 'Quiz API',
    html_url: 'https://github.com/EnisMulic/Quiz-API',
    website: '',
    description: 'A simple RESTful API in Go(lang)',
    tags: ['Go', 'MongoDB', 'gorilla/mux', 'REST API'],
  },
  {
    id: 6,
    image:
      'https://images.pexels.com/photos/5650642/pexels-photo-5650642.jpeg?cs=srgb&dl=pexels-tim-gouw-5650642.jpg&fm=jpg',
    name: 'Portfolio website',
    html_url: 'https://github.com/EnisMulic/enismulic.github.io',
    website: 'https://enismulic.github.io',
    description: '',
    tags: ['ReactJS', 'TypeScript', 'Github Actions'],
  },
];

export default projects;
