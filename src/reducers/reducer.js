export const initialState = [
    {
    item: "Learn about reducers",
    completed: false,
    id: 3892987589
    }
];

export const reducer = (state, action) => {

    switch(action.type.toUpperCase()) {
        case "ADD":
            return [...state, action.payload];
        case "EDIT":
            return state.map((item, index) => {
                if(index === state.indexOf(action.payload.item)) {
                    
                    return action.payload.newItem;
                }
                return item;
            });
        case "DELETE":
            return state.filter(item => {
                if(typeof(item) === "object") {
                    return !Object.values(item).includes(action.payload);
                } else {
                    return item !== action.payload;
                }
            });
        default: 
            return state;
    }
}