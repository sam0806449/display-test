export default [
	{
		path: "task",
		component: () => import(`@/modules/task/views/Index`),
		children: [
			{
				name: "task",
				path: "",
				component: () => import(`@/modules/task/views/Task`),
				meta: {
					title: "task.title",
					routerLeft: '/app/member',
					keepAlive: true,
					childPage: true
				}
			},

			{
				name: "taskNotes",
				path: "/app/taskNotes",
				component: () => import(`@/modules/task/views/Notes`),
				meta: {
					title: "task.title",
					routerLeft: '/app/member',
					keepAlive: true,
					childPage: true
				}
			}
		]

	},

	{
		name: "notesDetails",
		path: "notes/details",
		component: () => import(`@/modules/task/views/NotesDetails`),
		meta: {
			title: "notes.title",
			routerLeft: '/app/taskNotes',
			keepAlive: true,
			childPage: true
		}
	},

	{
		name: "taskDetails",
		path: "/task/details",
		component: () => import(`@/modules/task/views/TaskDetails`),
		meta: {
			title: "taskDetails.title",
			routerRight: '/app/task/rules',
			rightIcon: 'question',
			childPage: true,
			keepAlive: true
		}
	},
	{
		name: "taskSubmit",
		path: "task/submit",
		component: () => import(`@/modules/task/views/TaskSubmit`),
		meta: {
			title: "taskSubmit.title",
			childPage: true,
			keepAlive: true,
		}
	},
	{
		name: "taskRules",
		path: "task/rules",
		component: () => import(`@/modules/task/views/TaskRules`),
		meta: {
			title: "taskRules.title",
			childPage: true,
			keepAlive: true
		}
	}
];
