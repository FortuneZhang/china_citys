/**
 * 中国行政区三级联动菜单
 * by otwo 2014年4月28日 17:40:33
 */
var Area = Area || {};
Area = function(option) {
	option = option || {};
	// 加载扩展数据
	this.data = Area.data;

	this.s1 = option.s1;
	this.s2 = option.s2;
	this.s3 = option.s3;

	//value 使用的类型('name','code'),默认使用'name'
	this.valueType = option.valueType || 'name';

	this.setEvten();
	this.setDef(option.def);
	return this;
};
Area.prototype = {
	setEvten: function() {
		var self = this;
		this.s1.on('change', function(event) {
			var d = self.findNextData($(this).val());
			self.createOption(self.s2, d);
		});
		this.s2.on('change', function(event) {
			var d = self.findNextData($(this).val());
			self.createOption(self.s3, d);
		});
	},

	// 下级数据
	findNextData: function(name) {
		if (!name) {
			return false;
		}
		var d = this.data,
			ss = [],
			code = this.find(name);
		code = code && code.code;
		if (code === false) {
			return false;
		}
		for (var i = 0, len = d.length; i < len; i++) {
			if (d[i].pCode == code) {
				ss.push(d[i]);
			}
		}
		return ss;
	},

	// 通过code/name取得详细数据
	find: function(name) {
		var d = this.data,
			ss = name - 0 ? "code" : "name";

		for (var i = 0, len = d.length; i < len; i++) {
			if (d[i][ss] == name) {
				return d[i];
			}
		}
		return false;
	},
	createOption: function(ele, d) {
		var item = '<option value="%s">%s</option>',
			ss = "",
			html = "";
		for (var i = 0, len = d.length; i < len; i++) {
			ss = item.replace(/%s/g, d[i]['name']);

			if (this.valueType == 'code') {
				ss = ss.replace(d[i]['name'],d[i]['code']);
			}
			html += ss;
		}
		ele.empty().append(html).trigger('change');
	},
	setDef: function(def) {
		def = def || ['北京市'];
		def = this.format(def);
		var ss = '',
			d = [];
		d = this.findNextData('中国');
		this.createOption(this['s1'], d);
		for (var i = 1, len = def.length; i < len; i++) {
			this['s'+i].val(def[i].name).trigger('change');
			if (this.valueType == 'code') {
				this['s'+i].val(def[i]['code']).trigger('change');
			}
		}
	},

	// 将地区数据补全,如['哈尔滨市'] 应该补充为 ['黑龙江省','哈尔滨市','市辖区']
	// 区/县的名字可能重复(朝阳区[110105],朝阳区[220104])应该使用行政编码为value, 如 ['110105'] 应该补充为 ['北京市','北京市','朝阳区']
	format: function(d) {
		d = this.find(d[d.length - 1]);
		var data = [d],
			pArea = {};
		pArea = this.find(data[0]);
		while(pArea.code != '86'){
			pArea = this.find(data[0].pCode);
			if (pArea === false) {
				throw ('不存在的地区');
			}
			data.unshift(pArea);
		}

		return data;
	}
};