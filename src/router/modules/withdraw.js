export default [
    {
        name: 'withdraw',
        path: 'withdraw',
        component: () => import(`@/modules/withdraw/views/Withdraw`),
        meta: {
            title: 'withdraw.title',
            rightText: 'rechargeNotes',
            routerRight: 'rechargeNotes',
            childPage: true
        }
    },
    {
        name: 'withdrawCards',
        path: 'withdraw/cards',
        component: () => import(`@/modules/withdraw/views/WithdrawCards`),
        meta: {
            title: 'withdrawCards.title',
            childPage: true
        }
    }
]
