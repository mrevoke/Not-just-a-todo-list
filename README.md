
## 🧠 AI Todo Planner – React Native App

A smart and intuitive to-do list app powered by an AI-generated planning feature. Built with **React Native (Expo)**, **MobX**, and **Gemini's API**, the app includes daily notifications, task management, and AI-generated plans.

---

### 📦 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/mrevoke/Not-just-a-todo-list.git
cd memora-todo

# 2. Install dependencies
npm install

#3. update src\constants\keys.ts for gemini api key
export const GEMINI_API_KEY = 'Use your Gemini api key';

# 4. Start the Expo server
npx expo start
```


### 📸 Screenshots

#### 🏠 Home Screen

| Home View                                                                                | Add Task                                                                                     | Edit Task                                                                                     |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ![Home](https://github.com/user-attachments/assets/44ae6c0b-12d8-47f8-b4c1-a6aeb6ce3e54) | ![Add Task](https://github.com/user-attachments/assets/ba0219d4-809b-4739-9072-802e7d573e1a) | ![Edit Task](https://github.com/user-attachments/assets/53d3e5c5-fb1c-4195-8a3b-f5cc362771f0) |

---

#### 🔔 Daily Reminders

| Set New Reminder                                                                                 | Notification (1)                                                                            | Notification (2)                                                                            |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![Set Reminder](https://github.com/user-attachments/assets/d58061ff-f3f3-4b99-bb32-8d8f905ef4af) | ![Notif 1](https://github.com/user-attachments/assets/0c9e9a35-d883-4ad2-902f-3a518f3f83ab) | ![Notif 2](https://github.com/user-attachments/assets/58d8464c-84d7-4fe0-8c46-60e75103b3b3) |

---

#### 🤖 AI Plan Feature

| Generating Plan                                                                                | AI Plan Output                                                                              |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![Generating](https://github.com/user-attachments/assets/7c27e145-100a-4436-ae31-994d02dfdb03) | ![AI Plan](https://github.com/user-attachments/assets/9b8ba58f-daaf-4b26-939e-adf66348fec1) |

---

## ✅ Completed Features Checklist

### 1. 📝 Todo List Screen
- [x] Display a list of todo items (stored in local state using MobX)
- [x] Each item shows a title and a "Done" toggle
- [x] Visually differentiate completed vs. incomplete items

### 2. ➕ Add New Task
- [x] Include a modal form with an input field to add a new task
- [x] The new item appears in the list immediately upon save

### 3. 🛠️ Task Detail Screen
- [x] Allow editing of an existing task
- [x] Allow deleting a task
- [x] Accessed via tap on task from main list

### 4. ⏰ Daily Reminder
- [x] User can set a preferred daily notification time (e.g., 9:00 AM)
- [x] Local notifications scheduled using `expo-notifications`
- [x] Fully functional without a backend

### 5. 🤖 Bonus: AI Integration
- [x] Generate a smart AI summary for all tasks
- [x] Display AI response in Markdown as Gemini replies in markdown format

---
### ⚙️ My Approach

* Used **React Native (with Expo)** for fast cross-platform development.
* Implemented **MobX** for simple yet powerful state management.
* Integrated **daily reminders** using `expo-notifications`.
* Displayed the Gemini AI-generated plan in a **bottom sheet modal**, styled and scrollable.
* Supported **Markdown** to render AI output cleanly (e.g., bold, bullet points).

---

### 📚 Libraries & Justifications

| Library                         | Purpose             | Why?                                              |
| ------------------------------- | ------------------- | ------------------------------------------------- |
| `mobx`, `mobx-react-lite`       | State management    | Reactive, minimal boilerplate                     |
| `expo`                          | App runtime         | Easiest for cross-platform builds                 |
| `expo-notifications`            | Daily reminders     | Local notifications with schedule support         |
| `react-native-markdown-display` | Rich text rendering | Parses bullet points, headings, etc. from AI plan |
| `@expo/vector-icons`            | Icons               | Aesthetic Material & system icons                 |

---
## 🚀 Future Improvements

- Add a **social media feature**:
  - Users can share their **habit streaks** or updates with friends
  - Create and join **groups based on shared goals**

