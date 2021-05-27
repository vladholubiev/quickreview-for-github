import OptionsSync from 'webext-options-sync';
import {Options} from '../types';

export async function rerunJob(workflowId: string, jobNumber: number): Promise<void> {
  const jobId = await getJobIdByJobNumber(workflowId, jobNumber);
  console.log(`Found job id by job number`, {jobId});

  await rerunWorkflow(workflowId, jobId);
  console.log(`Triggered workflow rerun`);
}

async function getJobIdByJobNumber(workflowId: string, jobNumber: number): Promise<string> {
  const circleToken = await getCircleTokenFromOptions();
  const resp = await fetch(`https://circleci.com/api/v2/workflow/${workflowId}/job`, {
    method: 'GET',
    headers: {
      'circle-token': circleToken
    }
  });

  if (!resp.ok) {
    const {message} = await resp.json();
    throw new Error(message);
  }

  const json = await resp.json();

  return json.items.find(i => i.job_number === jobNumber).id;
}

async function rerunWorkflow(workflowId: string, jobId: string): Promise<string> {
  const circleToken = await getCircleTokenFromOptions();
  const resp = await fetch(`https://circleci.com/api/v2/workflow/${workflowId}/rerun`, {
    method: 'POST',
    headers: {
      'circle-token': circleToken,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      jobs: [jobId]
    })
  });

  if (!resp.ok) {
    const {message} = await resp.json();
    throw new Error(message);
  }

  return resp.json();
}

async function getCircleTokenFromOptions(): Promise<string> {
  const optionsStorage = new OptionsSync<Options>();
  const {circleToken} = await optionsStorage.getAll();

  return circleToken;
}
