#!/usr/bin/env node

const { execSync } = require('child_process')

const gitExecOptions = { encoding: 'utf-8' }

const getOriginBranches = (isSyncRemoteBranch = false) => {
  if (isSyncRemoteBranch) {
    execSync('git remote prune origin', gitExecOptions)
  }

  return execSync('git branch -a', gitExecOptions)
    .split('\n')
    .filter((el) => !!el)
    .map((el) => el.trim())
}

const getAllBranches = (branches) => {
  return branches.filter((el) => !el.includes('remotes/origin/HEAD -> origin/'))
}

const moveHeadToMasterBranch = (branches) => {
  const target = branches.find((el) => el.includes('remotes/origin/HEAD -> origin/'))
  if (!target) {
    throw new Error('找不到master分支')
  }

  const targetName = target.split(' -> ')[1]
  try {
    execSync(`git checkout -q --track ${targetName}`, gitExecOptions)
  } catch (err) {
    execSync(`git checkout -q ${targetName.replace('origin/', '')}`, gitExecOptions)
  }
}

const getBranchesWhere = (branches, condition) => {
  if (typeof condition === 'function') {
    return branches.filter((el) => condition(el))
  }

  return branches.filter((el) => condition.test(el))
}

const deleteBranches = (branches) => {
  branches.map((el) => {
    execSync(`git branch -D ${el}`, gitExecOptions)
  })
}

const originBranches = getOriginBranches(true)
const allBranches = getAllBranches(originBranches)
// moveHeadToMasterBranch(originBranches)
const remoteBranches = getBranchesWhere(allBranches, /^remotes\/origin/)
const localBranches = getBranchesWhere(allBranches, (branch) => {
  return !branch.startsWith('remotes/origin') && !branch.startsWith('* ')
})
const deletedBranches = getBranchesWhere(localBranches, (branch) => {
  return remoteBranches.every((el) => !el.endsWith(branch))
})


console.log('远程分支', remoteBranches)
console.log('本地分支', localBranches)
console.log('要删除的分支', deletedBranches)
deleteBranches(deletedBranches)
console.log('已删除')
