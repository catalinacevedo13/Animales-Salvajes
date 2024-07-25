let animales = (() => {
    let url = "http://localhost:5501/animales.json"
    let getData = async () => {
        let res = await fetch(url);
        let {animales} = await res.json();
        return animales;
    };
    return {getData};
})();

export default animales; 