//ref
// ref用来辅助开发者在不依赖jQuery的情况下，获取DOM元素或组件的引用 
//实现ref：使用对象的属性访问器（计算属性）

/* 响应式数据：一个变量的变化会导致依赖他的变量进行更新或者重新计算

那么我们如何将一个变量变成响应式数据呢？使用ref或者reactive就可以办到 */

//object accessor

let count
let activeEffect = null
let depMap = new Map()

function ref(rawValue) {
    const _rawValue = {

        get value() {
            console.log('ref被读取')
            const effects = depMap.get(_rawValue)
            if (Array.isArray(effects)) {
                depMap.set(_rawValue, [...effects, activeEffect])
            }
            else {
                depMap.set(_rawValue, [activeEffect])
            }
            return rawValue

        },
        set value(newValue) {
            if (newValue === rawValue) return;
            rawValue = newValue;
            const effects = depMap.get(_rawValue)
            effects.forEach(ef => ef())

        }
    }
    return _rawValue
}

function runEffect(effect) {
    activeEffect = effect
    activeEffect();
    activeEffect = null
}
const numberOneRef = ref(1);

function render() {
    count = numberOneRef.value
}

runEffect(render);

console.log(count)
numberOneRef.value = 100

console.log(count)

