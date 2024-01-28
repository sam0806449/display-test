export default [
    {
        name: 'turntable',
        path: 'turntable',
        component: () => import(`@/modules/turntable/views/Turntable`),
        meta: {
            class: 'turntable',
            rightText: 'turntableNotes',
            routerRight: '/app/turntableNotes',
            childPage: true,
            keepAlive: true
        }
    },

    {
        name: 'turntableNotes',
        path: 'turntableNotes',
        component: () => import(`@/modules/turntable/views/TurntableNotes`),
        meta: {
            title: 'turntableNotes.title',
            childPage: true,
            keepAlive: true
        }
    }
]
