import { defineStore } from "pinia";

export const useStudentStore = defineStore("student", {
  state: () => ({
    student: null as { name: { first: string; last: string }; email: string } | null,
  }),
  getters: {
    isLoggedIn: (state): boolean => state.student !== null,
    fullName: (state): string =>
      state.student ? `${state.student.name.first} ${state.student.name.last}` : "",
  },
  actions: {
    setStudent(student: { name: { first: string; last: string }; email: string }) {
      this.student = student;
    },
    clearStudent() {
      this.student = null;
    },
  },
});
