export interface PipedriveContext {
  crm: {
    objectId: number;
  };
  location: string;
  extension: {
    appId: number;
    appName: string;
    cardTitle: string;
  };
  user: {
    id: number;
    emails: string[];
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    teams: string[];
    locale: string;
  };
  portal: {
    id: number;
  };
}
