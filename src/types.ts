export interface Options {
  ghToken?: string;
  jiraToken?: string;
  [key: string]: string | number | boolean;
}

export type AnyAction = ApprovePRAction | MergePRAction | OpenURLsAction;

export interface ApprovePRAction {
  action: 'approve-pr';
  params: {
    org: string;
    repo: string;
    prNumber: string;
    username: string;
  };
}

export interface MergePRAction {
  action: 'merge-pr';
  params: {
    org: string;
    repo: string;
    prNumber: string;
    username: string;
  };
}

export interface OpenURLsAction {
  action: 'open-urls';
  params: {
    urls: string[];
  };
}
