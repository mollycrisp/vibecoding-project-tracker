import { useState, useEffect } from 'react';

/**
 * Vibecoding Project Tracker — starter scaffold.
 *
 * This file is intentionally almost empty. The boilerplate (Vite, React,
 * Tailwind) is configured for you, plus a few shared constants and a
 * localStorage helper. Everything visible on screen, you build.
 *
 * Where to start (build sequence in Phase 3):
 *   - M4  data-model    : render the four columns and the task cards below.
 *   - M5  crud-modal    : add the "+" button modal and the edit-on-click modal.
 *   - M6  tag-style     : feature vs. bug color coding (uses DESIGN.md §2 colors).
 *   - M7  task-owner    : assignee badge + "Hand off to..." dropdown.
 *   - M8  due-tint      : color cards by due date (uses DESIGN.md §2 due-state colors).
 *   - M9  context       : a curated Context briefing field on the modal.
 *   - M10 copy-prompt   : a "Copy as Prompt Context" button that serializes the task + context.
 *   - M11 anchors       : the Anchor Board above the Kanban.
 *   - M12 secret-sauce  : the one open-ended thing that makes your tracker yours.
 *
 * Search the file for `TODO M<n>` to find the right hook for each milestone.
 */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'feature'|'bug'} type
 * @property {'todo'|'in-progress'|'review'|'done'} status
 * @property {string} assignee
 * @property {string|null} dueDate     ISO 'YYYY-MM-DD'
 * @property {string} createdDate      ISO 'YYYY-MM-DD'
 */

// The four columns of the board, in render order.
// Use these IDs everywhere — do not invent new ones.
export const STAGES = [
  { id: 'todo', label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
];

// Replace with names from PRD section 8
export const TEAM = [
  'Teammate A',
  'Teammate B',
  'Teammate C',
];

// M4: Initial task data model
const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Build homepage',
    description: 'Create the main application layout.',
    type: 'feature',
    status: 'todo',
    assignee: TEAM[0],
    dueDate: null,
    createdDate: '2026-10-20',
  },
  {
    id: 'task-2',
    title: 'Fix navigation bug',
    description: 'Resolve navigation issues.',
    type: 'bug',
    status: 'in-progress',
    assignee: TEAM[1],
    dueDate: null,
    createdDate: '2026-10-20',
  },
  {
    id: 'task-3',
    title: 'Review dashboard',
    description: 'Test the project board layout.',
    type: 'feature',
    status: 'review',
    assignee: TEAM[2],
    dueDate: null,
    createdDate: '2026-10-20',
  },
  {
    id: 'task-4',
    title: 'Project setup',
    description: 'Configure React, Vite and Tailwind.',
    type: 'feature',
    status: 'done',
    assignee: TEAM[0],
    dueDate: null,
    createdDate: '2026-10-20',
  },
];

// Existing localStorage helper
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage errors
    }
  }, [key, value]);

  return [value, setValue];
}

export default function App() {

  // M4: Store tasks in localStorage
  const [tasks, setTasks] = useLocalStorage(
    'vibetracker.tasks',
    INITIAL_TASKS
  );

  // M4: Move a task to another column
  function updateTaskStatus(taskId, newStatus) {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  }

  // TODO M5: Add modal state for creating/editing tasks
  // const [editing, setEditing] = useState(null);

  // TODO M11: Add Anchor Board

  return (
    <div className="min-h-screen bg-surface-page p-6">

      {/* Header */}
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Vibecoding Project Tracker
          </h1>

          <p className="mt-1 text-sm text-text-muted">
            Team starter
          </p>
        </div>
      </header>

      {/* TODO M11: Anchor Board goes here */}

      {/* M4: Kanban Board */}
      <main className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        {STAGES.map(stage => {

          const stageTasks = tasks.filter(
            task => task.status === stage.id
          );

          return (
            <section
              key={stage.id}
              className="min-h-96 rounded-lg bg-slate-100 p-4"
            >

              {/* Column heading */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-text-primary">
                  {stage.label}
                </h2>

                <span className="rounded-full bg-white px-2 py-1 text-xs text-text-muted">
                  {stageTasks.length}
                </span>
              </div>

              {/* Task cards */}
              <div className="space-y-3">

                {stageTasks.map(task => (
                  <article
                    key={task.id}
                    className="rounded-lg border border-slate-200 bg-surface-card p-4 transition-colors hover:border-brand-accent"
                  >

                    <h3 className="text-sm font-semibold text-text-primary">
                      {task.title}
                    </h3>

                    <p className="mt-2 text-xs text-text-muted">
                      {task.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs capitalize text-text-muted">
                        {task.type}
                      </span>
                    </div>

                    {/* Change task status */}
                    <label
                      htmlFor={`status-${task.id}`}
                      className="mt-3 block text-xs text-text-muted"
                    >
                      Status
                    </label>

                    <select
                      id={`status-${task.id}`}
                      value={task.status}
                      onChange={e =>
                        updateTaskStatus(task.id, e.target.value)
                      }
                      className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-xs text-text-primary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    >
                      {STAGES.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                  </article>
                ))}

                {/* Empty column */}
                {stageTasks.length === 0 && (
                  <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center">
                    <p className="text-xs text-text-muted">
                      No tasks here yet.
                    </p>
                  </div>
                )}

              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
