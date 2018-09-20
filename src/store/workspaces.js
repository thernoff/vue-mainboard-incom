import axios from 'axios'

export default {
  state: {
    indexActiveWorkspace: 0,
    activeWorkspace: null,
    workspaces: [
      {
        title: 'Рабочая область пользователя',
        descripton: '',
        active: true,
        windows: []
      }
    ],
    dashboard: null,
  },

  mutations: {
    createNewWorkspace(state, nameWorkspace) {
      const title = nameWorkspace
      const descripton = ''
      const newWorkspace = {
        title,
        descripton,
        active: true,
        windows: []
      }

      if (state.activeWorkspace) {
        state.activeWorkspace.active = false
      }
      //state.windows = state.activeWorkspace.windows
      const length = state.workspaces.push(newWorkspace)
      state.activeWorkspace = state.workspaces[length - 1]

      //return state.activeWorkspace
    },

    setActiveWorkspace(state, index = undefined) {

      if (index != undefined) {
        state.activeWorkspace.active = false
        state.activeWorkspace = state.workspaces[index]
        state.activeWorkspace.active = true
      } else {
        for (let i = 0; i < state.workspaces.length; i++) {
          if (state.workspaces[i].active) {
            state.activeWorkspace = state.workspaces[i]
            break;
          }
        }
      }
      console.log('setActiveWorkspace', state.activeWorkspace)
      //return state.activeWorkspace
    },

    setWorkspaces(state, workspaces) {
      if (workspaces && workspaces.length > 0) {
        state.workspaces = workspaces
      }
    },

    setDashboard(state, dashboard) {
      state.dashboard = dashboard
    }
  },
  actions: {

    actionInitWorkspaces({ state, commit }, workspaces) {
      if (workspaces && workspaces.length > 0) {
        commit('setWorkspaces', workspaces)
        console.log('actionInitWorkspaces', state.workspaces)
        commit('setActiveWorkspace')
        if (state.activeWorkspace.windows && state.activeWorkspace.windows.length > 0) {
          commit('setWindows', state.activeWorkspace.windows)
          commit('setActiveWindow')
        }
      } else {
        commit('setActiveWorkspace')
        commit('setWindows', state.activeWorkspace.windows)
      }
    },

    actionCreateNewWorkspace({ state, commit, dispatch }, nameWorkspace) {
      commit('createNewWorkspace', nameWorkspace)
      commit('setWindows', state.activeWorkspace.windows)
      commit('setActiveWindow')
    },

    actionSetActiveWorkspace({ state, commit }, index) {
      commit('setActiveWorkspace', index)
      commit('setWindows', state.activeWorkspace.windows)
      commit('setActiveWindow')
    },

    actionGetDashboard({ commit, state, dispatch }) {
      axios
        .get('http://esv.elxis.test/extusers/fpage/desktop/')
        .then(
          response => {
            console.log('response', response.data)
            //commit('setStartmenuItems', response.data.dashboard)
            //dispatch('actionInitWorkspaces', response.data.workspaces)
          }
        )
        .catch(error => {
          console.log('error', error);
          const data = { "status": 1, "dashboard": [{ "id": "17", "parent_id": "0", "server_id": "0", "user_id": "6", "access": null, "label": "\u0416\u0443\u0440\u043d\u0430\u043b\u044b", "image": null, "link": null, "visible": "1", "ordering": "1", "elements": [{ "id": "2", "parent_id": "17", "server_id": "1", "user_id": "6", "access": "vandalboxes", "label": "\u042f\u0449\u0438\u043a\u0438", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/vandal-proof.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/vandalboxes\/", "visible": "1", "ordering": "1", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvdmFuZGFsYm94ZXMv" }, { "id": "5", "parent_id": "17", "server_id": "1", "user_id": "6", "access": "joblog", "label": "\u0416\u0443\u0440\u043d\u0430\u043b \u0440\u0430\u0431\u043e\u0442", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/diary.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/joblog\/", "visible": "1", "ordering": "2", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvam9ibG9nLw,," }] }, { "id": "16", "parent_id": "0", "server_id": "0", "user_id": "6", "access": null, "label": "\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438", "image": null, "link": null, "visible": "1", "ordering": "2", "elements": [{ "id": "6", "parent_id": "16", "server_id": "1", "user_id": "6", "access": "incident", "label": "\u0418\u043d\u0446\u0438\u0434\u0435\u043d\u0442\u044b", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/incident.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/incidents\/", "visible": "1", "ordering": "1", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvaW5jaWRlbnRzLw,," }, { "id": "8", "parent_id": "16", "server_id": "1", "user_id": "6", "access": "stationary", "label": "\u041c\u043e\u043d\u0438\u0442\u043e\u0440\u0438\u043d\u0433 \u0441\u0442\u0430\u0446\u0438\u043e\u043d\u0430\u0440\u043e\u0432", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/stationary.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/stationary\/", "visible": "1", "ordering": "2", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvc3RhdGlvbmFyeS8," }] }, { "id": "1", "parent_id": "0", "server_id": "1", "user_id": "6", "access": null, "label": "Speedcams", "image": null, "link": null, "visible": "1", "ordering": "3", "elements": [{ "id": "3", "parent_id": "1", "server_id": "1", "user_id": "6", "access": "dtp", "label": "\u0414\u0422\u041f", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/dtp.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/dtp\/", "visible": "1", "ordering": "1", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvZHRwLw,," }, { "id": "19", "parent_id": "1", "server_id": "1", "user_id": "6", "access": "carinfo:view", "label": "\u0421\u0435\u0440\u0432\u0438\u0441 \u0410\u0432\u0442\u043e-\u0418\u043d\u0444\u043e", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/carinfo.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/carinfo\/", "visible": "1", "ordering": "2", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvY2FyaW5mby8," }, { "id": "20", "parent_id": "1", "server_id": "1", "user_id": "6", "access": "monitoring", "label": "\u0422\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u043c\u043e\u043d\u0438\u0442\u043e\u0440\u0438\u043d\u0433", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/monitoring.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/monitoring\/", "visible": "1", "ordering": "3", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvbW9uaXRvcmluZy8," }, { "id": "46", "parent_id": "1", "server_id": "1", "user_id": "6", "access": "guards:module", "label": "\u041e\u0445\u0440\u0430\u043d\u043d\u0438\u043a\u0438", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/guard.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/guards.html", "visible": "1", "ordering": "4", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvZ3VhcmRzLmh0bWw," }, { "id": "47", "parent_id": "1", "server_id": "1", "user_id": "6", "access": "parkright", "label": "\u041f\u0430\u0440\u043a\u0440\u0430\u0439\u0442\u044b", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/parkright.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/parkrights\/", "visible": "1", "ordering": "5", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvcGFya3JpZ2h0cy8," }, { "id": "48", "parent_id": "1", "server_id": "1", "user_id": "6", "access": "timesheets_cameras", "label": "\u0422\u0430\u0431\u0435\u043b\u0438 \u043f\u043e \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u0430\u043c", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/timesheet.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/timesheets\/cameras\/", "visible": "1", "ordering": "6", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvdGltZXNoZWV0cy9jYW1lcmFzLw,," }, { "id": "49", "parent_id": "1", "server_id": "1", "user_id": "6", "access": "statistics:view", "label": "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/statistics.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/statistics.html", "visible": "1", "ordering": "7", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvc3RhdGlzdGljcy5odG1s" }, { "id": "50", "parent_id": "1", "server_id": "1", "user_id": "6", "access": "employees:module", "label": "\u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a\u0438", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/employees.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/employees.html", "visible": "1", "ordering": "8", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvZW1wbG95ZWVzLmh0bWw," }, { "id": "57", "parent_id": "1", "server_id": "1", "user_id": "6", "access": "cameras", "label": "\u0413\u0435\u043e\u043b\u043e\u043a\u0430\u0446\u0438\u044f", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/geolocation.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/cameras\/", "visible": "1", "ordering": "9", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvY2FtZXJhcy8," }, { "id": "58", "parent_id": "1", "server_id": "1", "user_id": "6", "access": "reports", "label": "\u041e\u0442\u0447\u0435\u0442\u044b", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/report.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/reports\/", "visible": "1", "ordering": "10", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvcmVwb3J0cy8," }, { "id": "59", "parent_id": "1", "server_id": "1", "user_id": "6", "access": "moncomplex", "label": "\u041c\u043e\u043d\u0438\u0442\u043e\u0440\u0438\u043d\u0433 \u043f\u0435\u0440\u0435\u0434\u0432\u0438\u0436\u043d\u044b\u0445 \u043a\u043e\u043c\u043f\u043b\u0435\u043a\u0441\u043e\u0432", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/mobile.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/moncomplex\/", "visible": "1", "ordering": "11", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvbW9uY29tcGxleC8," }, { "id": "60", "parent_id": "1", "server_id": "1", "user_id": "6", "access": "violpayments:statuses", "label": "\u0421\u0442\u0430\u0442\u0443\u0441\u044b \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0438\/\u0432\u044b\u0433\u0440\u0443\u0437\u043a\u0438 \u043d\u0430\u0440\u0443\u0448\u0435\u043d\u0438\u0439", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/chart.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/violations\/statuses.html", "visible": "1", "ordering": "12", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvdmlvbGF0aW9ucy9zdGF0dXNlcy5odG1s" }, { "id": "62", "parent_id": "1", "server_id": "1", "user_id": "6", "access": "violpayments:analitics", "label": "\u0410\u043d\u0430\u043b\u0438\u0442\u0438\u043a\u0430 \u043f\u043b\u0430\u0442\u0435\u0436\u0435\u0439 \u043e\u0442 \u0426\u0410\u0424\u0410\u041f", "image": "http:\/\/system.elxis.test\/components\/com_speedcams\/images\/violpays_chart.png", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/violpayments\/analitics.html", "visible": "1", "ordering": "14", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvdmlvbHBheW1lbnRzL2FuYWxpdGljcy5odG1s" }] }], "workspaces": [{ "title": "\u0420\u0430\u0431\u043e\u0447\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f", "descripton": "", "active": true, "windows": [{ "id": "zl8VrVH0ZZ1537356659", "title": "\u0414\u0422\u041f", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/dtp\/", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvZHRwLw,,", "top": 0, "left": 0, "width": 43.75, "height": 100, "zIndex": 9, "minimize": false, "fullscreen": false, "closed": false, "active": false, "classesCss": [] }, { "id": "sjQ0nYpJdd1537356672", "title": "\u0416\u0443\u0440\u043d\u0430\u043b \u0440\u0430\u0431\u043e\u0442", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/joblog\/", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvam9ibG9nLw,,", "top": 0, "left": 840, "width": 56.25, "height": 50, "zIndex": 10, "minimize": false, "fullscreen": false, "closed": false, "active": false, "classesCss": [] }, { "id": "LOs2W2ImgC1537356845", "title": "\u0421\u0435\u0440\u0432\u0438\u0441 \u0410\u0432\u0442\u043e-\u0418\u043d\u0444\u043e", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/carinfo\/", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvY2FyaW5mby8,", "top": 435, "left": 840, "width": 31.25, "height": 50, "zIndex": 12, "minimize": false, "fullscreen": false, "closed": false, "active": true, "classesCss": [] }] }, { "title": "\u0422\u0435\u0441\u0442\u043e\u0432\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c", "descripton": "", "active": false, "windows": [{ "id": "iZ9SCNoAbL1537356682", "title": "\u0418\u043d\u0446\u0438\u0434\u0435\u043d\u0442\u044b", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/incidents\/", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvaW5jaWRlbnRzLw,,", "top": 0, "left": 780, "width": 59.375, "height": 50, "zIndex": 6, "minimize": true, "fullscreen": false, "closed": false, "active": false, "classesCss": [] }, { "id": "E8h9pw6lb91537356686", "title": "\u0421\u0435\u0440\u0432\u0438\u0441 \u0410\u0432\u0442\u043e-\u0418\u043d\u0444\u043e", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/carinfo\/", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvY2FyaW5mby8,", "top": 0, "left": 0, "width": 40.625, "height": 50, "zIndex": 2, "minimize": true, "fullscreen": false, "closed": false, "active": false, "classesCss": [] }, { "id": "8gdcpwiixa1537356887", "title": "\u042f\u0449\u0438\u043a\u0438", "link": "http:\/\/system.elxis.test\/inner.php\/speedcams\/vandalboxes\/", "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvdmFuZGFsYm94ZXMv", "top": 435, "left": 0, "width": 100, "height": 50, "zIndex": 4, "minimize": true, "fullscreen": false, "closed": false, "active": false, "classesCss": [] }] }], "user": { "firstname": "\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440", "lastname": "\u0414\u0443\u0434\u0438\u043a\u043e\u0432", "uname": "test2", "email": "test2@test.com", "phone": "555-33-44", "gid": 5 }, "presets": [{ "title": "Test user", "description": "", "active": true, "rows": [{ "title": "\u0421\u0442\u0440\u043e\u043a\u0430 1", "height": 50, "minimize": false, "cells": [{ "title": "\u041e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u0435", "content": "", "width": 50, "minimize": false, "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvcmVwb3J0cy9lcXVpcG1lbnRzLmh0bWw,", "itemId": 25, "currentLink": "http:\/\/system.elxis.test\/inner.php\/speedcams\/reports\/equipments.html" }, { "title": "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430", "content": "", "width": 50, "minimize": false, "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvc3RhdGlzdGljcy5odG1s", "itemId": 35, "currentLink": "http:\/\/system.elxis.test\/inner.php\/speedcams\/statistics.html" }] }, { "title": "\u0421\u0442\u0440\u043e\u043a\u0430 2", "height": 50, "minimize": false, "cells": [{ "title": "\u0410\u043d\u0442\u0438\u0432\u0430\u043d\u0434\u0430\u043b\u044c\u043d\u044b\u0435 \u044f\u0449\u0438\u043a\u0438", "content": "", "width": 50, "minimize": false, "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvdmFuZGFsYm94ZXMv", "itemId": 28, "currentLink": "http:\/\/system.elxis.test\/inner.php\/speedcams\/vandalboxes\/" }, { "title": "\u0416\u0443\u0440\u043d\u0430\u043b \u0440\u0430\u0431\u043e\u0442", "content": "", "width": 50, "minimize": false, "apiLink": "http:\/\/system.elxis.test\/inner.php\/apiusers\/api\/login?uname=test2&pword=d58371c110100d4f9ff6d32aebdf6dc3d94c76c7&redirurl=aHR0cDovL3N5c3RlbS5lbHhpcy50ZXN0L2lubmVyLnBocC9zcGVlZGNhbXMvam9ibG9nLw,,", "itemId": 27, "currentLink": "http:\/\/system.elxis.test\/inner.php\/speedcams\/joblog\/" }] }] }], "lang": "ru" }
          commit('setStartmenuItems', data.dashboard)
          dispatch('actionInitWorkspaces', data.workspaces)
        })
    },

    actionSaveSettingsDesktop({ commit, state, getters }) {
      const workspaces = state.workspaces

      axios({
        method: 'post',
        headers: { 'Content-Type': 'application/form-data' },
        url: 'http://esv.elxis.test/extusers/fpage/savedesktop/',
        data: {
          settings: workspaces
        }
      })
        .then(
          response => {
            console.log('response', response)
          }
        )
        .catch(error => {
          console.log(error);
        })

    }
  },
  getters: {
    getWorkspaces(state) {
      return state.workspaces
    },

    workspaces(state) {
      return state.workspaces
    },

    getActiveWorkspace(state) {
      /* let activeWorkspace;
      for (let i = 0; i < state.workspaces.length; i++ ) {
        if ( state.workspaces[i].active ) {
          activeWorkspace = state.workspaces[i]
          break;
        }
      } */

      return state.activeWorkspace
    },

    getWindowsActiveWorkspace(state) {
      /* let activeWorkspace;
      for (let i = 0; i < state.workspaces.length; i++ ) {
        if ( state.workspaces[i].active ) {
          activeWorkspace = state.workspaces[i]
          break;
        }
      } */

      return state.activeWorkspace.windows
    },

    getTitleActiveWorkspace(state) {
      return (state.activeWorkspace) ? state.activeWorkspace.title : ''
    },

    workspaces(state) {
      return state.workspaces
    }
  }
}