export const reducer = (state, action) => {
    switch (action.type.toUpperCase()) {
        case "ADD":
            return {
                ...state,
                [action.payload.elem]: action.payload.value
            }
        case "EDIT":
            return {
                ...state,
                [action.payload.elem]:
                    Array.isArray(state[action.payload.elem]) ?
                        state[action.payload.elem].map(item => {
                            if (item === action.payload.item) {
                                return action.payload.value;
                            }
                            return item;
                        })
                        : action.payload.value
            };
        case "DELETE":
            return {
                ...state,
                [action.payload.elem]:
                    state[action.payload.elem].filter(item => item !== action.payload.value)
            }

        default:
            return state;
    }
}