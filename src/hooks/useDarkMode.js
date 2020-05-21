import useLocalStorage from "./useLocalStorage";

export default function useDarkMode(initialValue) {
    const [isEnabled, setIsEnabled] = useLocalStorage("darkMode", initialValue);

    const setDarkMode = (e) => {
        setIsEnabled(e.target.checked);
        if(e.target.checked) {
            document.body.classList.add("darkMode");
        } else {
            document.body.classList.remove("darkMode");
        }
    }

    return [isEnabled, setDarkMode];
}