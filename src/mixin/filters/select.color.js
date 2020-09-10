export default (value, arg, arg2) => {
    // console.log(value, arg, arg2)
    let result = value;
    const reg = new RegExp(`(${arg})`, "i");
    const className = arg2 || "text-red";
    if (arg && arg.trim() === "") {
        return result;
    } else {
        result = result.match(reg) ? result.replace(reg, `<span class='${className}'>$1</span>`) : result;
        console.log(result)
        return result;
    }
}
