

export default {
    //=====================================普通输入框====================================//
    a: `<el-form-item label="###name###">
                <el-input v-model="###vModel###" size="mini" placeholder="###placeholder###" class="w-100" maxlength="25"></el-input>
            </el-form-item>`,
    //=====================================普通输入框(带清空)====================================//
    b: `<el-form-item label="###name###">
                <el-input v-model="###vModel###" size="mini" placeholder="###placeholder###" class="w-100" maxlength="25" clearable @clear="getData"></el-input>
            </el-form-item>`,

    //======================================单选框(固定值)===================================//
    c: `<el-form-item label="###name###">
                <el-select v-model="###vModel###" placeholder="###placeholder###" size="mini" class="w-100">
                    <el-option label="苹果" :value="1"></el-option>
                    <el-option label="香蕉" :value="2"></el-option>
                </el-select>
            </el-form-item>`,
    //======================================单选框(可清空)===================================//
    d: `<el-form-item label="###name###">
                <el-select v-model="###vModel###" placeholder="###placeholder###" size="mini" class="w-100" clearable @clear="getData">
                    <el-option label="苹果" :value="1"></el-option>
                    <el-option label="香蕉" :value="2"></el-option>
                </el-select>
            </el-form-item>`,
    //======================================单选框(远程)===================================//
    e: `<el-form-item label="###name###">
                <el-select v-model="###vModel###" placeholder="###placeholder###" size="mini" class="w-100" clearable @clear="getData">
                    <el-option v-for="(item, index) in ###selectOptions###" :key="index" :label="item.###label###" :value="item.###value###"></el-option>
                </el-select>
            </el-form-item>`,
    //======================================单选框(远程全部)===================================//
    f: `<el-form-item label="###name###">
                <el-select v-model="###vModel###" placeholder="###placeholder###" size="mini" class="w-100" clearable @clear="getData">
                    <el-option label="全部" :value="null"></el-option>
                    <el-option v-for="(item, index) in ###selectOptions###" :key="index" :label="item.###label###" :value="item.###value###"></el-option>
                </el-select>
            </el-form-item>`,
    //=====================================多选框(远程)====================================//
    g: `<el-select v-model="###vModel###" placeholder="###placeholder###" size="mini" class="w-100" multiple>
            <el-option v-for="(item, index) in ###selectOptions###" :key="index" :label="item.###label###" :value="item.###value###"></el-option>
        </el-select>`,
    //=====================================多选框(远程可清空)====================================//
    h: `<el-select v-model="###vModel###" placeholder="###placeholder###" size="mini" class="w-100" multiple clearable @clear="getData">
            <el-option v-for="(item, index) in ###selectOptions###" :key="index" :label="item.###label###" :value="item.###value###"></el-option>
        </el-select>`,
    //=====================================单日期(默认)====================================//
    i: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="date" placeholder="###placeholder###" size="mini" format="yyyy-MM-dd HH:mm:ss" class="w-100"></el-date-picker>
        </el-form-item>`,
    //=====================================单日期(大于今天)====================================//
    j: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="date" placeholder="###placeholder### " size="mini" value-format="###valueFormat###" format="###format###" class="w-100" :picker-options="###pickerOptions###"></el-date-picker>
        </el-form-item>`,
    //=====================================单日期(大于等于今天)====================================//
    k: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="date" placeholder="###placeholder### " size="mini" value-format="###valueFormat###" format="###format###" class="w-100" :picker-options="###pickerOptions###"></el-date-picker>
        </el-form-item>`,
    //=====================================单日期(小于今天)====================================//
    l: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="date" placeholder="###placeholder### " size="mini" value-format="###valueFormat###" format="###format###" class="w-100" :picker-options="###pickerOptions###"></el-date-picker>
        </el-form-item>`,
    //=====================================单日期(小于等于今天)====================================//
    m: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="date" placeholder="###placeholder### " size="mini" value-format="###valueFormat###" format="###format###" class="w-100" :picker-options="###pickerOptions###"></el-date-picker>
        </el-form-item>`,

    //=====================================多日期(默认)====================================//
    n: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="daterange" placeholder="###placeholder###" size="mini" format="yyyy-MM-dd HH:mm:ss" class="w-100"></el-date-picker>
        </el-form-item>`,
    //=====================================多日期(大于今天)====================================//
    o: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="daterange" placeholder="###placeholder### " size="mini" value-format="###valueFormat###" format="###format###" class="w-100" :picker-options="###pickerOptions###"></el-date-picker>
        </el-form-item>`,
    //=====================================多日期(大于等于今天)====================================//
    p: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="daterange" placeholder="###placeholder### " size="mini" value-format="###valueFormat###" format="###format###" class="w-100" :picker-options="###pickerOptions###"></el-date-picker>
        </el-form-item>`,
    //=====================================多日期(小于今天)====================================//
    q: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="daterange" placeholder="###placeholder### " size="mini" value-format="###valueFormat###" format="###format###" class="w-100" :picker-options="###pickerOptions###"></el-date-picker>
        </el-form-item>`,
    //=====================================多日期(小于等于今天)====================================//
    r: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="daterange" placeholder="###placeholder### " size="mini" value-format="###valueFormat###" format="###format###" class="w-100" :picker-options="###pickerOptions###"></el-date-picker>
        </el-form-item>`,
    
    //=====================================日期时间(默认)====================================//
    s: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="datatime" placeholder="###placeholder###" size="mini" format="yyyy-MM-dd HH:mm:ss" class="w-100"></el-date-picker>
        </el-form-item>`,
    //=====================================日期时间(大于今天)====================================//
    t: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="datatime" placeholder="###placeholder### " size="mini" value-format="###valueFormat###" format="###format###" class="w-100" :picker-options="###pickerOptions###"></el-date-picker>
        </el-form-item>`,
    //=====================================日期时间(大于等于今天)====================================//
    u: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="datatime" placeholder="###placeholder### " size="mini" value-format="###valueFormat###" format="###format###" class="w-100" :picker-options="###pickerOptions###"></el-date-picker>
        </el-form-item>`,
    //=====================================日期时间(小于今天)====================================//
    v: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="datatime" placeholder="###placeholder### " size="mini" value-format="###valueFormat###" format="###format###" class="w-100" :picker-options="###pickerOptions###"></el-date-picker>
        </el-form-item>`,
    //=====================================日期时间(小于等于今天)====================================//
    w: `<el-form-item label="###name###">
            <el-date-picker v-model="###vModel###" type="datatime" placeholder="###placeholder###" size="mini" value-format="###valueFormat###" format="###format###" class="w-100" :picker-options="###pickerOptions###"></el-date-picker>
        </el-form-item>`,

    //=====================================固定值级联====================================//
    x: `<el-form-item label="###name###">
            <el-cascader v-model="###vModel###" placeholder="###placeholder###" size="mini" :options="###cascaderOptions###" :props="###cascaderProps###"></el-cascader>
        </el-form-item>`


}



