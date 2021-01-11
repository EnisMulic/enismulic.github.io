interface Project {
  id: number;
  image: string;
  name: string;
  html_url: string;
  website: string;
  description: string;
  tags: Array<string>;
}

export default Project;
