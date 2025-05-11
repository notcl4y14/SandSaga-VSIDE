class UIState
{
	constructor ()
	{
		this.elements = {};
	}

	add_element (id)
	{
		this.elements[id] = document.getElementById(id);
	}

	select_rebuild (id, options)
	{
		let select = this.elements[id];
		let innerHTML = "";

		for (let i = 0; i < options.length; i++)
		{
			const option = options[i];
			innerHTML += `<option value="${option}"">${option}</option>`;
		}

		select.innerHTML = innerHTML;
	}
}

class ContentState
{
	constructor ()
	{
		this.brushes = {};
		this.tools = {};
	}
}

class BrushDef
{
	constructor ()
	{
		this.behavior = "";
		this.color = "";
		this.color_diff = 0;
	}

	randomize ()
	{
		// https://files.harag.cz/www/app/sand-saga/prod/25w17a/jsdoc/BrushDefs.html
		const rand_behavior = [
			"ACID",
			"AIR",
			"ASH",
			"BRICK",
			"COAL",
			"EFFECT_BURNT",
			"EFFECT_EXTINGUISH",
			"EFFECT_MOLTEN",
			"EFFECT_TEMP_0",
			"EFFECT_TEMP_127",
			"EFFECT_TEMP_200",
			"EFFECT_TEMP_255",
			"EFFECT_WET",
			"EXTINGUISHER",
			"FIRE",
			"GRASS",
			"GRAVEL",
			"METAL",
			"METAL_MOLTEN",
			"METEOR",
			"METEOR_FROM_LEFT",
			"METEOR_FROM_RIGHT",
			"NAPALM",
			"NONE",
			"OIL",
			"PARTICLE_EXPLOSION",
			"PLASTIC",
			"PLASTIC_MOLTEN",
			"ROCK",
			"SAND",
			"SOIL",
			"STEAM",
			"THERMITE",
			"TREE",
			"TREE_LEAF_DARKER",
			"TREE_LEAF_LIGHTER",
			"TREE_ROOT",
			"TREE_WOOD",
			"TREE_WOOD_DARK",
			"WALL",
			"WATER",
			"WATER_BLOODY",
			"WATER_OILY",
			"WOOD",
		];

		this.behavior = rand_behavior[Math.floor(Math.random() * rand_behavior.length)];
		this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
		this.color_diff = Math.floor(Math.random() * (15 - (-15)) + 15);
	}
}

class ToolDef
{
	constructor ()
	{
		this.brush = "";
		this.size = 0;
		this.badge_code_name = "";
		this.badge_display_name = "";
		this.badge_color = "";
		this.badge_category = "";
	}
}

let ui_state;
let content_state;

function load ()
{
	ui_state = new UIState();

		ui_state.add_element("Select-Brushes");
		ui_state.add_element("Select-Tools");
		ui_state.add_element("Button-AddBrush");
		ui_state.add_element("Button-AddTool");
		ui_state.add_element("Button-ChooseBrushBehavior");
		ui_state.add_element("Button-RandomizeBrush");
		ui_state.add_element("Button-RemoveBrush");
		ui_state.add_element("Button-RandomizeTool");
		ui_state.add_element("Button-RemoveTool");
		ui_state.add_element("Button-Export");
		ui_state.add_element("Input-BrushName");
		ui_state.add_element("Input-BrushBehavior");
		ui_state.add_element("Input-BrushColor");
		ui_state.add_element("Input-BrushColorDiff");
		ui_state.add_element("Input-ToolName");
		ui_state.add_element("Input-ToolBrush");
		ui_state.add_element("Input-ToolSize");
		ui_state.add_element("Input-ToolBadgeCodeName");
		ui_state.add_element("Input-ToolBadgeDisplayName");
		ui_state.add_element("Input-ToolBadgeColor");
		ui_state.add_element("Input-ToolBadgeCategory");
		ui_state.add_element("Textarea-ExportCode");

		ui_state.elements["Select-Brushes"].onchange = (e) =>
		{
			const element = ui_state.elements["Select-Brushes"];
			const brush_name = element.options[element.selectedIndex].value;
			const selected_brush = content_state.brushes[brush_name];

			ui_state.elements["Input-BrushName"].value = brush_name;
			ui_state.elements["Input-BrushBehavior"].value = selected_brush.behavior;
			ui_state.elements["Input-BrushColor"].value = selected_brush.color;
			ui_state.elements["Input-BrushColorDiff"].value = selected_brush.color_diff;
		}

		ui_state.elements["Select-Tools"].onchange = (e) =>
		{
			const element = ui_state.elements["Select-Tools"];
			const tool_name = element.options[element.selectedIndex].value;
			const selected_tool = content_state.tools[tool_name];

			ui_state.elements["Input-ToolName"].value = tool_name;
			ui_state.elements["Input-ToolBrush"].value = selected_tool.brush;
			ui_state.elements["Input-ToolSize"].value = selected_tool.size;
			ui_state.elements["Input-ToolBadgeCodeName"].value = selected_tool.badge_code_name;
			ui_state.elements["Input-ToolBadgeDisplayName"].value = selected_tool.badge_display_name;
			ui_state.elements["Input-ToolBadgeColor"].value = selected_tool.badge_color;
			ui_state.elements["Input-ToolBadgeCategory"].value = selected_tool.badge_category;
		}

		ui_state.elements["Button-AddBrush"].onclick = (e) =>
		{
			const element = ui_state.elements["Button-AddBrush"];

			let brush_name = `New Brush`;

			if (content_state.brushes[brush_name] != undefined)
			{
				let count = 1;

				while (true)
				{
					brush_name = `New Brush ${count}`;

					if (content_state.brushes[brush_name])
					{
						count += 1;
						brush_name = `New Brush ${count}`;
					}
					else
					{
						break;
					}
				}
			}

			content_state.brushes[brush_name] = new BrushDef();
			ui_state.select_rebuild("Select-Brushes", Object.keys(content_state.brushes));
		}

		ui_state.elements["Button-AddTool"].onclick = (e) =>
		{
			const element = ui_state.elements["Button-AddTool"];

			let tool_name = `New Tool`;

			if (content_state.tools[tool_name] != undefined)
			{
				let count = 1;

				while (true)
				{
					tool_name = `New Tool ${count}`;

					if (content_state.tools[tool_name])
					{
						count += 1;
						tool_name = `New Tool ${count}`;
					}
					else
					{
						break;
					}
				}
			}

			content_state.tools[tool_name] = new ToolDef();
			ui_state.select_rebuild("Select-Tools", Object.keys(content_state.tools));
		}

		ui_state.elements["Button-ChooseBrushBehavior"].onclick = (e) =>
		{
			const element = ui_state.elements["Button-ChooseBrushBehavior"];
			alert("https://files.harag.cz/www/app/sand-saga/prod/25w17a/jsdoc/BrushDefs.html");
		}

		ui_state.elements["Button-RandomizeBrush"].onclick = (e) =>
		{
			const element = ui_state.elements["Button-RandomizeBrush"];
			const select_element = ui_state.elements["Select-Brushes"];
			const brush_name = select_element.options[select_element.selectedIndex].value;
			let selected_brush = content_state.brushes[brush_name];
			selected_brush.randomize();

			ui_state.elements["Input-BrushName"].value = brush_name;
			ui_state.elements["Input-BrushBehavior"].value = selected_brush.behavior;
			ui_state.elements["Input-BrushColor"].value = selected_brush.color;
			ui_state.elements["Input-BrushColorDiff"].value = selected_brush.color_diff;
		}

		ui_state.elements["Button-RemoveBrush"].onclick = (e) =>
		{
			const element = ui_state.elements["Button-RemoveBrush"];
			const select_element = ui_state.elements["Select-Brushes"];
			const brush_name = select_element.options[select_element.selectedIndex].value;

			const confirmed = confirm(`Are you sure you want to remove brush "${brush_name}"?`);

			if (confirmed)
			{
				delete content_state.brushes[brush_name];
				ui_state.select_rebuild("Select-Brushes", Object.keys(content_state.brushes));
			}
		}

		ui_state.elements["Button-RandomizeTool"].onclick = (e) =>
		{
			const element = ui_state.elements["Button-RandomizeTool"];
			const select_element = ui_state.elements["Select-Tools"];
			const tool_name = select_element.options[select_element.selectedIndex].value;
			let selected_tool = content_state.tools[tool_name];
			// selected_tool.randomize();

			ui_state.elements["Input-ToolName"].value = tool_name;
			ui_state.elements["Input-ToolBrush"].value = selected_tool.brush;
			ui_state.elements["Input-ToolSize"].value = selected_tool.size;
			ui_state.elements["Input-ToolBadgeCodeName"].value = selected_tool.badge_code_name;
			ui_state.elements["Input-ToolBadgeDisplayName"].value = selected_tool.badge_display_name;
			ui_state.elements["Input-ToolBadgeColor"].value = selected_tool.badge_color;
			ui_state.elements["Input-ToolBadgeCategory"].value = selected_tool.badge_category;
		}

		ui_state.elements["Button-RemoveTool"].onclick = (e) =>
		{
			const element = ui_state.elements["Button-RemoveTool"];
			const select_element = ui_state.elements["Select-Tools"];
			const tool_name = select_element.options[select_element.selectedIndex].value;

			const confirmed = confirm(`Are you sure you want to remove tool "${tool_name}"?`);

			if (confirmed)
			{
				delete content_state.tools[tool_name];
				ui_state.select_rebuild("Select-Tools", Object.keys(content_state.tools));
			}
		}

		ui_state.elements["Button-Export"].onclick = (e) =>
		{
			const element = ui_state.elements["Button-Export"];
			let code_brushes = "";
			let code_tools = "";

			let brushes = Object.values(content_state.brushes);
			let tools = Object.values(content_state.tools);

			code_brushes = "const brushes = [\n";

			for (let i = 0; i < brushes.length; i++)
			{
				const brush = brushes[i];

				let r, g, b;

				{
					let temp_str = "";
					let count = 0;

					for (let j = 0; j < brush.color.length; j++)
					{
						if (isNaN(parseInt(brush.color[j])) == false)
						{
							temp_str += brush.color[j];
						}
						else if (temp_str != "")
						{
							if      (count == 0) r = parseInt(temp_str);
							else if (count == 1) g = parseInt(temp_str);
							else if (count == 2) b = parseInt(temp_str);

							temp_str = "";
							count++;
						}
					}
				}

				code_brushes += `\tBrushes.colorRandomize(${brush.color_diff}, Brushes.color(${r}, ${g}, ${b}, BrushDefs.${brush.behavior})),\n`;
			}

			code_brushes += "];\n";

			code_tools = "const tools = [\n";

			for (let i = 0; i < tools.length; i++)
			{
				const tool = tools[i];
				console.log(tool);
				code_tools += `\tTools.roundBrushTool(brushes[${Object.keys(content_state.brushes).indexOf(tool.brush)}], ${tool.size}, { codeName: "${tool.badge_code_name}", displayName: "${tool.badge_display_name}", badgeStyle: { backgroundColor: "${tool.badge_color}" }, category: "${tool.badge_category}" }),\n`;
			}

			code_tools += "];\n";

			let code =
`const BrushDefs = window.SandGameJS.BrushDefs;
const Brushes = window.SandGameJS.Brushes;
const ToolDefs = window.SandGameJS.ToolDefs;
const Tools = window.SandGameJS.Tools;
const Scenes = window.SandGameJS.Scenes;

// Sand Saga - Visual SIDE
// https://github.com/notcl4y14/SandSaga-VSIDE

${code_brushes}${code_tools}

return {
	scene: {}, // Makes an empty scene
    tools: [
        ToolDefs.ERASE,
        ToolDefs.MOVE,
		...tools,
        ToolDefs.SOIL,
        ToolDefs.GRAVEL,
        ToolDefs.WALL,
    ],
    disableSizeChange: true,
    disableSettings: true,
    disableSceneSelection: true
}`;
			ui_state.elements["Textarea-ExportCode"].innerHTML = code;
		}

		ui_state.elements["Input-BrushName"].onchange = (e) =>
		{
			const element = ui_state.elements["Input-BrushName"];
			const select_element = ui_state.elements["Select-Brushes"];
			const brush_name = select_element.options[select_element.selectedIndex].value;
			const selected_brush = content_state.brushes[brush_name];
			const new_brush_name = element.value;

			// https://stackoverflow.com/a/14592469/22146374
			Object.defineProperty(content_state.brushes, new_brush_name,
				Object.getOwnPropertyDescriptor(content_state.brushes, brush_name));
			content_state.brushes[new_brush_name] = content_state.brushes[brush_name];
			delete content_state.brushes[brush_name];

			ui_state.select_rebuild("Select-Brushes", Object.keys(content_state.brushes));

			// Set the select element to the renamed brush
			select_element.selectedIndex = select_element.options.length - 1;
		}

		ui_state.elements["Input-BrushBehavior"].onchange = (e) =>
		{
			const element = ui_state.elements["Input-BrushBehavior"];
			const select_element = ui_state.elements["Select-Brushes"];
			const brush_name = select_element.options[select_element.selectedIndex].value;
			const selected_brush = content_state.brushes[brush_name];

			selected_brush.behavior = element.value;
		}

		ui_state.elements["Input-BrushColor"].onchange = (e) =>
		{
			const element = ui_state.elements["Input-BrushColor"];
			const select_element = ui_state.elements["Select-Brushes"];
			const brush_name = select_element.options[select_element.selectedIndex].value;
			const selected_brush = content_state.brushes[brush_name];

			selected_brush.color = element.value;
		}

		ui_state.elements["Input-BrushColorDiff"].onchange = (e) =>
		{
			const element = ui_state.elements["Input-BrushColorDiff"];
			const select_element = ui_state.elements["Select-Brushes"];
			const brush_name = select_element.options[select_element.selectedIndex].value;
			const selected_brush = content_state.brushes[brush_name];

			selected_brush.color_diff = element.value;
		}

		ui_state.elements["Input-ToolName"].onchange = (e) =>
		{
			const element = ui_state.elements["Input-ToolName"];
			const select_element = ui_state.elements["Select-Tools"];
			const tool_name = select_element.options[select_element.selectedIndex].value;
			const selected_tool = content_state.tools[tool_name];
			const new_tool_name = element.value;

			// https://stackoverflow.com/a/14592469/22146374
			Object.defineProperty(content_state.tools, new_tool_name,
				Object.getOwnPropertyDescriptor(content_state.tools, tool_name));
			content_state.tools[new_tool_name] = content_state.tools[tool_name];
			delete content_state.tools[tool_name];

			ui_state.select_rebuild("Select-Tools", Object.keys(content_state.tools));

			// Set the select element to the renamed tool
			select_element.selectedIndex = select_element.options.length - 1;
		}

		ui_state.elements["Input-ToolBrush"].onchange = (e) =>
		{
			const element = ui_state.elements["Input-ToolBrush"];
			const select_element = ui_state.elements["Select-Tools"];
			const tool_name = select_element.options[select_element.selectedIndex].value;
			const selected_tool = content_state.tools[tool_name];

			selected_tool.brush = element.value;
		}

		ui_state.elements["Input-ToolSize"].onchange = (e) =>
		{
			const element = ui_state.elements["Input-ToolSize"];
			const select_element = ui_state.elements["Select-Tools"];
			const tool_name = select_element.options[select_element.selectedIndex].value;
			const selected_tool = content_state.tools[tool_name];

			selected_tool.size = element.value;
		}

		ui_state.elements["Input-ToolBadgeCodeName"].onchange = (e) =>
		{
			const element = ui_state.elements["Input-ToolBadgeCodeName"];
			const select_element = ui_state.elements["Select-Tools"];
			const tool_name = select_element.options[select_element.selectedIndex].value;
			const selected_tool = content_state.tools[tool_name];

			selected_tool.badge_code_name = element.value;
		}

		ui_state.elements["Input-ToolBadgeDisplayName"].onchange = (e) =>
		{
			const element = ui_state.elements["Input-ToolBadgeDisplayName"];
			const select_element = ui_state.elements["Select-Tools"];
			const tool_name = select_element.options[select_element.selectedIndex].value;
			const selected_tool = content_state.tools[tool_name];

			selected_tool.badge_display_name = element.value;
		}

		ui_state.elements["Input-ToolBadgeColor"].onchange = (e) =>
		{
			const element = ui_state.elements["Input-ToolBadgeColor"];
			const select_element = ui_state.elements["Select-Tools"];
			const tool_name = select_element.options[select_element.selectedIndex].value;
			const selected_tool = content_state.tools[tool_name];

			selected_tool.badge_color = element.value;
		}

		ui_state.elements["Input-ToolBadgeCategory"].onchange = (e) =>
		{
			const element = ui_state.elements["Input-ToolBadgeCategory"];
			const select_element = ui_state.elements["Select-Tools"];
			const tool_name = select_element.options[select_element.selectedIndex].value;
			const selected_tool = content_state.tools[tool_name];

			selected_tool.badge_category = element.value;
		}


	content_state = new ContentState();

		content_state.brushes["Sand"] = new BrushDef();

			content_state.brushes["Sand"].behavior = "SAND";
			content_state.brushes["Sand"].color = "rgb(255, 255, 0)";
			content_state.brushes["Sand"].color_diff = 10;

		content_state.brushes["Water"] = new BrushDef();

			content_state.brushes["Water"].behavior = "WATER";
			content_state.brushes["Water"].color = "rgb(0, 128, 128)";
			content_state.brushes["Water"].color_diff = 10;

		content_state.tools["Sand"] = new ToolDef();

			content_state.tools["Sand"].brush = "Sand";
			content_state.tools["Sand"].size = "ToolDefs.DEFAULT_SIZE";
			content_state.tools["Sand"].badge_code_name = "sand";
			content_state.tools["Sand"].badge_display_name = "Sand";
			content_state.tools["Sand"].badge_color = "rgb(255, 255, 0)";
			content_state.tools["Sand"].badge_category = "powders";

		content_state.tools["Water"] = new ToolDef();

			content_state.tools["Water"].brush = "Water";
			content_state.tools["Water"].size = "ToolDefs.DEFAULT_SIZE";
			content_state.tools["Water"].badge_code_name = "water";
			content_state.tools["Water"].badge_display_name = "Water";
			content_state.tools["Water"].badge_color = "rgb(0, 128, 128)";
			content_state.tools["Water"].badge_category = "fluids";

	ui_state.select_rebuild("Select-Brushes", ["Sand", "Water"]);
	ui_state.select_rebuild("Select-Tools", ["Sand", "Water"]);
}

window.onload = () =>
{
	load();
}