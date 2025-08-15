#!/usr/bin/env node

const tracker = {};

const addTask = (taskName) => {
  if (!tracker[taskName]) {
    tracker[taskName] = { status: 'pending' };
    console.log(`Task added: ${taskName}`);
  } else {
    console.log(`Task already exists: ${taskName}`);
  }
};

const updateTask = (taskName, newStatus) => {
  if (tracker[taskName]) {
    tracker[taskName].status = newStatus;
    console.log(`Task updated: ${taskName} -> ${newStatus}`);
  } else {
    console.log(`Task not found: ${taskName}`);
  }
};

const deleteTask = (taskName) => {
  if (tracker[taskName]) {
    delete tracker[taskName];
    console.log(`Task deleted: ${taskName}`);
  } else {
    console.log(`Task not found: ${taskName}`);
  }
};

const listTasks = () => {
  console.log('Tasks:');
  for (const task in tracker) {
    console.log(`  ${task} - ${tracker[task].status}`);
  }
};

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('tracker > ');
rl.prompt();

rl.on('line', (line) => {
  const [command, ...args] = line.trim().split(' ');
  switch (command) {
    case 'add':
      addTask(args.join(' '));
      break;
    case 'update':
      updateTask(args[0], args[1]);
      break;
    case 'delete':
      deleteTask(args[0]);
      break;
    case 'list':
      listTasks();
      break;
    default:
      console.log('Unknown command');
  }
  rl.prompt();
});

rl.on('close', () => {
  process.exit(0);
});