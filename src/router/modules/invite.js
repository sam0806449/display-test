export default [
    {
        name: 'inviteUser',
        path: 'inviteUser',
        component: () => import(`@/modules/invite/views/InviteUser`),
        meta: {
            title: 'invite.title',
            rightText: 'inviteRules',
            class: 'invite',
            routerRight: 'invite/rules',
            childPage: true
        }
    },
    {
        name: 'inviteRules',
        path: 'invite/rules',
        component: () => import(`@/modules/invite/views/InviteRules`),
        meta: {
            title: 'inviteRules.title',
            childPage: true,
            keepAlive: true
        }
    }
]
