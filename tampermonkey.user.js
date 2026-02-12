// ==UserScript==
// @name Tempo Template Menu
// @namespace https://jira.russianpost.ru/
// @version 0.1
// @match *://jira.russianpost.ru/browse/*
// @match *://jora.ru/secure/Tempo.jspa*
// @grant none
// @updateURL    https://raw.githubusercontent.com/Dedok3d/Tempo-Template-Menu/refs/heads/master/tampermonkey.js
// @downloadURL  https://raw.githubusercontent.com/Dedok3d/Tempo-Template-Menu/refs/heads/master/tampermonkey.js
// ==/UserScript==

const styles = `
    .cascade-dropdown {
      box-shadow: rgba(10, 20, 110, 0.22) 0px 2px 10px 0px;
      position: fixed;
      display: flex;
      z-index: 99999;
      max-height: 420px;
      overflow: hidden;
      border-radius: 6px;
    }

    .dropdown-column {
      height: 100%;
      background: #fff;
      border: 1px solid #d0d0d0;
      border-radius: 6px;
      min-width: 320px;
      max-height: 420px;
      overflow-y: auto;
      padding: 4px 0;
      display: flex;
      flex-direction: column;
    }

    .dropdown-row {
      color: #1f2937;
      font-weight: 500;
      padding: 8px 12px;
      cursor: pointer;
      white-space: nowrap;
      display: flex;
      align-items: center;
      user-select: none;
      min-height: 36px;
      box-sizing: border-box;
    }

    .dropdown-row:hover {
      background: #f3f4f6;
    }

    .dropdown-row.has-children {
      color: #1f2937;
      font-weight: 500;
    }

    .dropdown-row .arrow {
      color: #9ca3af;
      font-size: 14px;
      margin-left: auto;
    }

    .dropdown-row:hover .arrow {
      color: #4b5563;
    }

    .task-row {
      padding: 6px 12px;
      cursor: default;
    }

    .task-row:hover {
      background: #f3f4f6;
    }

    .task-checkbox {
      margin: 0;
      cursor: pointer;
      flex-shrink: 0;
    }

    .dropdown-actions {
      padding: 12px;
      border-top: 1px solid #e5e7eb;
      margin-top: auto;
      background: #f9fafb;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .selection-info {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 8px;
    }

    .insert-button, .clear-button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      transition: background-color 0.2s;
    }

    .insert-button {
      background-color: #3b82f6;
      color: white;
    }

    .insert-button:hover:not(:disabled) {
      background-color: #2563eb;
    }

    .insert-button:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }

    .clear-button {
      background-color: #f3f4f6;
      color: #374151;
      margin-bottom: 8px;
    }

    .clear-button:hover {
      background-color: #e5e7eb;
    }

    .back-button {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 4px;
      cursor: pointer;
      color: #3b82f6;
      font-weight: 500;
    }

    .back-button:hover {
      background: #f3f4f6;
    }

    .back-button::before {
      content: "←";
      margin-right: 8px;
    }
  `;

const templates = {
  Сопровождение: {
    "Организационные мероприятия": [
      {
        name: "Участие в совещании по вопросам сопровождения ИС",
        type: "Сопровождение",
      },
      {
        name: "Участие в совещании по поиску решения проблемы",
        type: "Сопровождение",
      },
      { name: "Управление комадной сопровождения", type: "Сопровождение" },
      {
        name: "Участие в комиссии по разбору крупных и критических инцидентов",
        type: "Сопровождение",
      },
    ],
    "Консультирование, исполнение ЗНО": [
      {
        name: "Анализ инцидента/проблемы, сбор фактуры",
        type: "Сопровождение",
      },
      {
        name: "Анализ инцидента/проблемы, сбор фактуры",
        type: "Сопровождение",
      },
    ],
    "Решение инцидента": [
      {
        name: "Анализ инцидента/проблемы, сбор фактуры",
        type: "Сопровождение",
      },
      {
        name: "Ознакомление с описанием инцидента/проблемы",
        type: "Сопровождение",
      },
      {
        name: "Изучение эксплуатационной документации",
        type: "Сопровождение",
      },
      { name: "Классификация инцидента/проблемы", type: "Сопровождение" },
      {
        name: "Определение массовости инцидента/проблемы",
        type: "Сопровождение",
      },
      { name: "Выявление причин инцидента/проблемы", type: "Сопровождение" },
      { name: "Воспроизведение инцидента/проблемы", type: "Сопровождение" },
      {
        name: "Описание сценария/Воспроизведение проблемы",
        type: "Сопровождение",
      },
      { name: "Изучение и анализ логов", type: "Сопровождение" },
      { name: "Решение инцидента/проблемы", type: "Сопровождение" },
      {
        name: "Формирование задачи для экспертов (передача на следующую линию)",
        type: "Сопровождение",
      },
      { name: "Техническая стабилизация ПО", type: "Сопровождение" },
      {
        name: "Обновление пакетов и библиотек до актуальной версии",
        type: "Сопровождение",
      },
      { name: "Адаптация алгоритма/формата", type: "Сопровождение" },
      { name: "Подготовка модульных тестов", type: "Сопровождение" },
      {
        name: "Проверка работоспособности после восстановления",
        type: "Сопровождение",
      },
      {
        name: "Проверка функциональной работоспособности",
        type: "Сопровождение",
      },
      {
        name: "Проверка взаимодействие между модулями и компонентами ИС",
        type: "Сопровождение",
      },
      {
        name: "Проверка основных функций после изменения",
        type: "Сопровождение",
      },
      {
        name: "Регрессионная проверка работоспособности",
        type: "Сопровождение",
      },
      {
        name: "Автоматическая проверка работоспособности",
        type: "Сопровождение",
      },
      {
        name: "Наблюдение за ИС после устранения инцидента/проблемы",
        type: "Сопровождение",
      },
      {
        name: "Подготовка протокола по критическому/массовому инциденту",
        type: "Сопровождение",
      },
    ],
    "Анализ работоспособности": [
      { name: "Анализ работоспособности ИС", type: "Сопровождение" },
      {
        name: "Предотвращение сбоев и аномальной работы",
        type: "Сопровождение",
      },
      {
        name: "Комплексная проверка работоспособности ИС",
        type: "Сопровождение",
      },
    ],
    "Администрирование ППО/СПО": [
      {
        name: "Настройка системы и сервисов по запросу",
        type: "Сопровождение",
      },
      {
        name: "Обновление и настройка сертификатов в ИС",
        type: "Сопровождение",
      },
      {
        name: "Настройка сборки програмного обеспечения",
        type: "Сопровождение",
      },
      { name: "Установка ПО в срезу развертывания", type: "Сопровождение" },
      {
        name: "Выполнение работ по обслуживанию ИС в рамках запроса",
        type: "Сопровождение",
      },
      { name: "Настройка системы по запросу", type: "Сопровождение" },
    ],
    "Устранение уязвимостей": [
      {
        name: "Настройка системы и сервисов по запросу",
        type: "Сопровождение",
      },
      {
        name: "Обновление и настройка сертификатов в ИС",
        type: "Сопровождение",
      },
      {
        name: "Настройка сборки програмного обеспечения",
        type: "Сопровождение",
      },
      { name: "Установка ПО в срезу развертывания", type: "Сопровождение" },
      {
        name: "Выполнение работ по обслуживанию ИС в рамках запроса",
        type: "Сопровождение",
      },
      { name: "Настройка системы по запросу", type: "Сопровождение" },
    ],
  },
  Развитие: {
    "Организационные мероприятия": [
      { name: "Участие в совещании по уточнению требований", type: "Анализ" },
      { name: "Подготовка ЧТЗ", type: "Анализ" },
      { name: "Управление комадной сопровождения", type: "Сопровождение" },
    ],
    "Анализ БФТ и входящих требований": [
      { name: "Рассмотрение БФТ", type: "Анализ" },
      { name: "Согласование БФТ", type: "Анализ" },
      { name: "Участие в разработке БП/ВУБП/SOLA", type: "Анализ" },
    ],
    "Анализ и проработка архитектуры ИС": [
      { name: "Анализ требований Заказчика", type: "Анализ" },
      {
        name: "Анализ формата данных и спецификаций требований",
        type: "Анализ",
      },
      { name: "Анализ и проработка архитектуры ИС", type: "Анализ" },
    ],
    "Формирование требований": [
      { name: "Формирование требований к ИС", type: "Анализ" },
      { name: "Уточнение требований к ИС", type: "Анализ" },
      { name: "Согласование требований к ИС", type: "Анализ" },
    ],
    "Модификация ИС": [
      { name: "Кодирование ИС", type: "Разработка" },
      { name: "Написание модульных тестов ИС", type: "Разработка" },
      {
        name: "Анализ материалов сканеров на уязвимости",
        type: "Разработка",
      },
      { name: "Устранение уязвимостей", type: "Разработка" },
      { name: "Контроль качества изменений", type: "Анализ" },
      { name: "Разработка сценариев тестирования", type: "Тестирование" },
      { name: "Функциональное тестирование", type: "Тестирование" },
      { name: "Регрессионное тестирование", type: "Тестирование" },
      { name: "Автоматическое тестирование", type: "Тестирование" },
      { name: "Нагрузочное тестирование", type: "Тестирование" },
      { name: "Интеграционное тестирование", type: "Тестирование" },
      { name: "Формирвоание отчетности", type: "Тестирование" },
    ],
  },
};

(function () {
  let selectedItems = [];

  function waitForNewTextarea(oldRef) {
    return new Promise((resolve) => {
      const found = document.querySelector("#description");
      if (!oldRef && found) return resolve(found);
      if (oldRef && oldRef !== found && found) return resolve(found);
      const obs = new MutationObserver(() => {
        const curr = document.querySelector("#description");
        if (curr && curr !== oldRef) {
          obs.disconnect();
          resolve(curr);
        }
      });
      obs.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        obs.disconnect();
        resolve(document.querySelector("#description"));
      }, 100);
    });
  }

  function setReactSelectValue(text) {
    const container = document.querySelector("#_Видработ_");
    if (!container) return Promise.resolve();
    const input =
      container.querySelector('input[role="combobox"]') ||
      container.querySelector('input[type="text"]');
    if (!input) return Promise.resolve();
    input.dispatchEvent(
      new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );
    return new Promise((resolve) => {
      const pick = setInterval(() => {
        const options = [...document.querySelectorAll('[role="option"]')];
        const target = options.find((o) => o.textContent.trim() === text);
        if (target) {
          clearInterval(pick);
          target.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
          target.click();
          setTimeout(resolve, 50);
        }
      }, 50);
      setTimeout(() => {
        clearInterval(pick);
        resolve();
      }, 100);
    });
  }

  function copyStyle(from, to) {
    const s = getComputedStyle(from);
    to.style.font = s.font;
    to.style.padding = s.padding;
    to.style.border = s.border;
    to.style.borderRadius = s.borderRadius;
    to.style.background = s.backgroundColor;
    to.style.color = s.color;
  }

  function createButton(textarea) {
    const btn = document.createElement("div");
    btn.textContent = "Выберите шаблон";
    btn.style.cursor = "pointer";
    btn.style.marginBottom = "8px";
    copyStyle(textarea, btn);
    return btn;
  }

  function createPopup(btn, textarea) {
    const popup = document.createElement("div");
    popup.className = "cascade-dropdown";

    const r = btn.getBoundingClientRect();
    popup.style.left = r.left + "px";
    popup.style.top = r.bottom + "px";

    const column = document.createElement("div");
    column.className = "dropdown-column";
    popup.appendChild(column);

    const navigationStack = [];

    const render = () => {
      column.innerHTML = "";

      if (navigationStack.length > 0) {
        const backBtn = document.createElement("div");
        backBtn.className = "back-button";
        backBtn.textContent = "Назад";
        backBtn.addEventListener("click", handleBack);
        column.appendChild(backBtn);
      }

      if (navigationStack.length === 0) {
        renderCategories();
      } else if (navigationStack.length === 1) {
        const category = navigationStack[0];
        renderSubcategories(category);
      } else if (navigationStack.length === 2) {
        const [category, subcategory] = navigationStack;
        renderTasks(category, subcategory);
      }
    };

    const renderCategories = () => {
      Object.keys(templates).forEach((category) => {
        const hasChildren = Object.keys(templates[category]).length > 0;
        const row = document.createElement("div");
        row.className = "dropdown-row has-children";
        row.innerHTML = `${category} <span class="arrow">›</span>`;
        row.addEventListener("click", () => {
          handleCategoryClick(category);
        });
        column.appendChild(row);
      });
    };

    const renderSubcategories = (category) => {
      if (!templates[category]) {
        const empty = document.createElement("div");
        empty.className = "dropdown-row";
        empty.textContent = "Нет данных";
        column.appendChild(empty);
        return;
      }
      Object.keys(templates[category]).forEach((subcat) => {
        const hasChildren = templates[category][subcat]?.length > 0;
        const row = document.createElement("div");
        row.className = "dropdown-row has-children";
        row.innerHTML = `${subcat} <span class="arrow">›</span>`;
        row.addEventListener("click", () => {
          handleSubcategoryClick(subcat);
        });
        column.appendChild(row);
      });
    };

    const renderTasks = (category, subcategory) => {
      const tasks = templates[category]?.[subcategory];
      if (!tasks || tasks.length === 0) {
        const empty = document.createElement("div");
        empty.className = "dropdown-row";
        empty.textContent = "Нет задач";
        column.appendChild(empty);
        return;
      }

      const selectionInfo = document.createElement("div");
      const insertButton = document.createElement("button");

      const checkboxEventBus = new EventTarget();

      tasks.forEach((item) => {
        const row = document.createElement("div");
        row.className = "dropdown-row task-row";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.dataset.type = item.type;
        checkbox.dataset.name = item.name;
        checkbox.dataset.category = subcategory;

        const isChecked = selectedItems.some(
          (sel) => sel.type === item.type && sel.name === item.name,
        );
        checkbox.checked = isChecked;

        checkbox.addEventListener("change", (e) => {
          e.stopPropagation();
          handleTaskCheckboxChange(item, subcategory, checkbox.checked);
          selectionInfo.textContent = `Выбрано: ${selectedItems.length}`;
          insertButton.disabled = selectedItems.length === 0;
        });
        checkboxEventBus.addEventListener(
          "clear-all",
          () => (checkbox.checked = false),
        );

        const label = document.createElement("label");
        label.textContent = item.name;
        label.style.marginLeft = "8px";
        label.style.cursor = "pointer";
        label.style.flex = "1";
        label.addEventListener("click", (e) => {
          e.stopPropagation();
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event("change", { bubbles: true }));
        });

        row.appendChild(checkbox);
        row.appendChild(label);
        column.appendChild(row);
      });

      const actionsRow = document.createElement("div");
      actionsRow.className = "dropdown-actions";

      selectionInfo.className = "selection-info";
      selectionInfo.textContent = `Выбрано: ${selectedItems.length}`;

      insertButton.className = "insert-button";
      insertButton.textContent = "Вставить выбранные";
      insertButton.disabled = selectedItems.length === 0;
      insertButton.addEventListener("click", async () => {
        await insertSelectedItems();
        popup.remove();
      });

      const clearButton = document.createElement("button");
      clearButton.className = "clear-button";
      clearButton.textContent = "Очистить";
      clearButton.addEventListener("click", () => {
        handleClear();
        checkboxEventBus.dispatchEvent(new Event("clear-all"));
        selectionInfo.textContent = `Выбрано: 0`;
        insertButton.disabled = true;
      });

      actionsRow.appendChild(selectionInfo);
      actionsRow.appendChild(clearButton);
      actionsRow.appendChild(insertButton);
      column.appendChild(actionsRow);
    };

    const handleCategoryClick = (category) => {
      navigationStack.push(category);
      render();
    };

    const handleSubcategoryClick = (subcategory) => {
      navigationStack.push(subcategory);
      render();
    };

    const handleBack = () => {
      navigationStack.pop();
      render();
    };

    const handleTaskCheckboxChange = (item, subcategory, isChecked) => {
      if (isChecked) {
        selectedItems.push({
          type: item.type,
          name: item.name,
          category: subcategory,
        });
      } else {
        selectedItems = selectedItems.filter(
          (sel) => !(sel.type === item.type && sel.name === item.name),
        );
      }
    };

    const handleClear = () => {
      selectedItems = [];
    };

    const insertSelectedItems = async () => {
      if (selectedItems.length === 0) return;

      const old = document.querySelector("#description");
      const types = [...new Set(selectedItems.map((item) => item.type))];
      const mainType = types[0];

      await setReactSelectValue(mainType);
      const fresh = await waitForNewTextarea(old);
      if (!fresh) return;

      fresh.focus();
      const currentText = fresh.value.trim();
      const itemsToInsert = selectedItems.map((item) => item.name).join(". ");

      const setter = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        "value",
      ).set;

      setter.call(
        fresh,
        currentText ? currentText + "\n" + itemsToInsert : itemsToInsert,
      );
      fresh.dispatchEvent(new Event("input", { bubbles: true }));

      selectedItems = [];
    };

    render();

    document.addEventListener("mousedown", (e) => {
      if (!popup.contains(e.target) && e.target !== btn) {
        popup.remove();
      }
    });

    return popup;
  }

  if (!document.querySelector("#cascade-dropdown-styles")) {
    const styleEl = document.createElement("style");
    styleEl.id = "cascade-dropdown-styles";
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  function mount(textarea) {
    if (!document.querySelector('[data-testid="tui-modal"]')) return;
    if (document.querySelector("#tempo-cascade-btn")) return;

    const btn = createButton(textarea);
    btn.id = "tempo-cascade-btn";

    textarea.parentElement.parentElement.prepend(btn);

    btn.onclick = () => {
      const old = document.querySelector("#tempo-popup");
      if (old) old.remove();

      const p = createPopup(btn, textarea);
      p.id = "tempo-popup";
      document.body.appendChild(p);
    };
  }

  const obs = new MutationObserver(() => {
    const ta = document.querySelector("#description");
    if (ta) mount(ta);
  });

  obs.observe(document.body, { childList: true, subtree: true });
})();
