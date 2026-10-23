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

// Replace these with the names from PRD section 8
export const TEAM = [
  'Adam',
  'Brian',
  'Callum',
];

// M4: Example tasks
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

// Get today's date in local YYYY-MM-DD format
function todayDate() {
  const now = new Date();
  const localDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  );
  return localDate.toISOString().slice(0, 10);
}

// Create an empty task for the modal
function emptyTask() {
  return {
    title: '',
    description: '',
    type: 'feature',
    status: 'todo',
    assignee: TEAM[0],
    dueDate: null,
    createdDate: todayDate(),
  };
}

export default function App() {

  // M4: Stored task data
  const [tasks, setTasks] = useLocalStorage(
    'vibetracker.tasks',
    INITIAL_TASKS
  );

  // M5: Modal state
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState(emptyTask);

  // M4: Update task status
  function updateTaskStatus(taskId, newStatus) {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
  }

  // M7: Update the person assigned to a task
  function updateTaskAssignee(taskId, newAssignee) {
    setTasks(previousTasks =>
      previousTasks.map(task =>
        task.id === taskId
          ? { ...task, assignee: newAssignee }
          : task
      )
    );
  }

  // M5: Open modal for a new task
  function openNewTask() {
    setDraft(emptyTask());
    setEditing('new');
  }

  // M5: Open modal to edit existing task
  function openEditTask(task) {
    setDraft({ ...task });
    setEditing(task.id);
  }

  // M5: Close modal
  function closeModal() {
    setEditing(null);
  }

  // M5: Close modal with Escape
  useEffect(() => {
    if (editing === null) return;

    function handleEscape(event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    }

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [editing]);

  // M5: Update a form field
  function updateDraft(field, value) {
    setDraft(previous => ({
      ...previous,
      [field]: value,
    }));
  }

  // M5: Save new or edited task
  function saveTask(event) {
    event.preventDefault();

    const title = draft.title.trim();

    if (!title) {
      return;
    }

    const savedTask = {
      ...draft,
      title,
      description: draft.description.trim(),
    };

    if (editing === 'new') {

      // Create a unique ID for the new task
      const newTask = {
        ...savedTask,
        id: crypto.randomUUID(),
      };

      setTasks(previous => [...previous, newTask]);

    } else {

      // Update existing task
      setTasks(previous =>
        previous.map(task =>
          task.id === editing
            ? { ...savedTask, id: task.id }
            : task
        )
      );
    }

    closeModal();
  }

  // M5: Delete task with confirmation
  function deleteTask() {
    if (editing === null || editing === 'new') {
      return;
    }

    const confirmed = window.confirm(
      'Delete this task? This action cannot be undone.'
    );

    if (!confirmed) return;

    setTasks(previous =>
      previous.filter(task => task.id !== editing)
    );

    closeModal();
  }

  return (
    <div className="min-h-screen bg-surface-page p-6">

      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">
            Vibecoding Project Tracker
          </h1>

          <p className="mt-1 text-sm text-text-muted">
            Team starter
          </p>
        </div>

        {/* M5: Add Task button */}
        <button
          type="button"
          onClick={openNewTask}
          className="rounded-lg bg-brand-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
        >
          + New Task
        </button>
      </header>

      {/* TODO M11: Anchor Board */}

      {/* M4: Four-column Kanban Board */}
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

              {/* Column header */}
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
                    className={`rounded-lg border border-l-4 bg-surface-card p-4
                      transition-colors hover:shadow-sm
                      ${
                        task.type === 'bug'
                          ? 'border-slate-200 border-l-type-bug'
                          : 'border-slate-200 border-l-type-feature'
                      }
                    `}
                  >

                    {/* M5: Click task details to edit */}
                    <button
                      type="button"
                      onClick={() => openEditTask(task)}
                      className="block w-full rounded text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary"
                    >
                      <h3 className="text-sm font-semibold text-text-primary">
                        {task.title}
                      </h3>

                      <p className="mt-2 text-xs text-text-muted">
                        {task.description}
                      </p>
                      <div className="mt-3">
                        <span
                          className={`inline-flex items-center gap-2 rounded-md
                            px-3 py-1 text-xs font-medium
                            ${
                              task.type === 'bug'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-teal-100 text-teal-700'
                            }
                          `}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              task.type === 'bug'
                                ? 'bg-type-bug'
                                : 'bg-type-feature'
                            }`}
                          />

                          {task.type === 'bug' ? 'Bug' : 'Feature'}
                        </span>
                      </div>
                    </button>
      
                    {/* M7: Assignee badge */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                        <span aria-hidden="true">👤</span>
                        {task.assignee || 'Unassigned'}
                      </span>
                    </div>

                    {/* M7: Hand off task to another team member */}
                    <div className="mt-3">
                      <label
                        htmlFor={`assignee-${task.id}`}
                        className="mb-1 block text-xs text-text-muted"
                      >
                        Hand off to...
                      </label>

                      <select
                        id={`assignee-${task.id}`}
                        value={task.assignee || ''}
                        onChange={e =>
                          updateTaskAssignee(task.id, e.target.value)
                        }
                        className="w-full rounded-md border border-slate-200 bg-white p-2 text-xs text-text-primary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      >
                        {!TEAM.includes(task.assignee) && (
                          <option value={task.assignee || ''}>
                            {task.assignee || 'Unassigned'}
                          </option>
                        )}

                        {TEAM.map(member => (
                          <option key={member} value={member}>
                            {member}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* M4: Status dropdown */}
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
                        <option
                          key={option.id}
                          value={option.id}
                        >
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

      {/* M5: Create / Edit modal */}
      {editing !== null && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4"
          onClick={event => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-modal-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
          >

            {/* Modal heading */}
            <div className="mb-6 flex items-center justify-between">
              <h2
                id="task-modal-title"
                className="text-xl font-semibold text-text-primary"
              >
                {editing === 'new'
                  ? 'Create New Task'
                  : 'Edit Task'}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="rounded p-1 text-slate-500 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            {/* Task form */}
            <form onSubmit={saveTask} className="space-y-4">

              {/* Title */}
              <div>
                <label
                  htmlFor="task-title"
                  className="mb-1 block text-sm font-medium"
                >
                  Task Title *
                </label>

                <input
                  id="task-title"
                  type="text"
                  required
                  autoFocus
                  value={draft.title}
                  onChange={e =>
                    updateDraft('title', e.target.value)
                  }
                  placeholder="Enter task title"
                  className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="task-description"
                  className="mb-1 block text-sm font-medium"
                >
                  Description
                </label>

                <textarea
                  id="task-description"
                  rows={3}
                  value={draft.description}
                  onChange={e =>
                    updateDraft('description', e.target.value)
                  }
                  placeholder="Describe the task..."
                  className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>

              {/* Type and Status */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label
                    htmlFor="task-type"
                    className="mb-1 block text-sm font-medium"
                  >
                    Task Type
                  </label>

                  <select
                    id="task-type"
                    value={draft.type}
                    onChange={e =>
                      updateDraft('type', e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 p-3 text-sm"
                  >
                    <option value="feature">Feature</option>
                    <option value="bug">Bug</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="task-status"
                    className="mb-1 block text-sm font-medium"
                  >
                    Status
                  </label>

                  <select
                    id="task-status"
                    value={draft.status}
                    onChange={e =>
                      updateDraft('status', e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 p-3 text-sm"
                  >
                    {STAGES.map(stage => (
                      <option key={stage.id} value={stage.id}>
                        {stage.label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Assignee */}
              <div>
                <label
                  htmlFor="task-assignee"
                  className="mb-1 block text-sm font-medium"
                >
                  Assigned To
                </label>

                <select
                  id="task-assignee"
                  value={draft.assignee}
                  onChange={e =>
                    updateDraft('assignee', e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 p-3 text-sm"
                >
                  {TEAM.map(member => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>

              {/* Due date */}
              <div>
                <label
                  htmlFor="task-due"
                  className="mb-1 block text-sm font-medium"
                >
                  Due Date
                </label>

                <input
                  id="task-due"
                  type="date"
                  value={draft.dueDate || ''}
                  onChange={e =>
                    updateDraft(
                      'dueDate',
                      e.target.value || null
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 p-3 text-sm"
                />
              </div>

              {/* Creation date */}
              <p className="text-xs text-text-muted">
                Created: {draft.createdDate}
              </p>

              {/* Form actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">

                <div>
                  {editing !== 'new' && (
                    <button
                      type="button"
                      onClick={deleteTask}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Delete Task
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    {editing === 'new'
                      ? 'Create Task'
                      : 'Save Changes'}
                  </button>
                </div>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
