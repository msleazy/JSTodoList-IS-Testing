// Configura Jest para manejar localStorage

import Model from '../js/model.js';

describe('Modelo ToDo', () => {
  let model;

  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
    model = new Model();
  });

  test('Debe añadir una nueva tarea al modelo', () => {
    model.addTodo('Prueba Jest', 'Testear la aplicación');
    expect(model.getTodos()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Prueba Jest',
          description: 'Testear la aplicación',
          completed: false,
        }),
      ]),
    );
  });

  test('Debe eliminar una tarea existente', () => {
    const model = new Model();
    const todo = model.addTodo('Tarea a borrar', 'Descripción');
    model.removeTodo(todo.id);
    expect(model.getTodos()).not.toContainEqual(todo);
  });

  test('Debe editar una tarea existente', () => {
    const model = new Model();
    const todo = model.addTodo('Tarea original', 'Descripción original');
    model.editTodo(todo.id, { 
      title: 'Tarea editada', 
      description: 'Nueva descripción' 
    });
    const updatedTodo = model.getTodos().find(t => t.id === todo.id);
    expect(updatedTodo.title).toBe('Tarea editada');
  });

  test('Debe cargar tareas desde LocalStorage', () => {
    localStorage.setItem('todos', JSON.stringify([{ 
      id: 1, 
      title: 'Tarea guardada', 
      description: 'Persistencia', 
      completed: false 
    }]));
    const model = new Model();
    expect(model.getTodos()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Tarea guardada',
        }),
      ]),
    );
  });

  test('Debe filtrar tareas por estado "completed"', () => {
    const model = new Model();
    model.addTodo('Tarea 1', 'Pendiente', false);
    model.addTodo('Tarea 2', 'Completada', true);
    const completedTodos = model.getTodos().filter(todo => todo.completed === true);
    expect(completedTodos.length).toBe(1);
  });

  test('Debe cambiar el estado de una tarea', () => {
    const model = new Model();
    const todo = model.addTodo('Tarea', 'Test');
    model.toggleCompleted(todo.id);
    expect(model.getTodos()[0].completed).toBe(false);
  });

  test('Debe añadir fecha de vencimiento a una tarea', () => {
    const model = new Model();
    const dueDate = new Date('2023-12-31');
    model.addTodo('Tarea con fecha', 'Prueba', false, dueDate);
    console.log(model.getTodos()[0].dueDate);
  });
});

  
  