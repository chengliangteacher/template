import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import test from "@/pages/test/test.vue";

describe("计数器", () => {
    it("测试计数器", () => {
        const wrapper = shallowMount(test);
        wrapper.find("button").trigger("click");
        expect({ x: 1 }).to.deep.equal({ x: 1 })
    });
});
