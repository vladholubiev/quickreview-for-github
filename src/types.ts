export interface Options {
  ghToken?: string;
  circleToken?: string;
  [key: string]: string | number | boolean;
}

export type AnyAction = ApprovePRAction | MergePRAction;

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
