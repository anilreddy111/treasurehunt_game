var programming_languages = [
	{
		question:"I dry as I get wetter. ",
		answer:"towel"
	},
	{
		question:"Nothing rhymes with me exactly, and you'd have a pretty hard time making scrambled eggs without my help. ",
		answer:"spatula"
	},
	{
		question:"The pot called me black. I said 'look who's talking?!' Then, I made some tea. ",
		answer:"kettle"
	},
	{
		question:"I make bones hard and cookies soft. Babies love me. ",
		answer:"milk"
	},
	{
		question:"Is it cold in here, or is it just me? Leave me open, and things will go sour really fast. ",
		answer:"fridge"
	},
	{
		question:"I have blades but I'm not a knife. Want to cool down? Give me a whirl. ",
		answer:"fan"
	},
	{
		question:"I'm handy for making milkshakes, but don't put your hand inside of me! ",
		answer:"blender"
	},
	{
		question:"I don't mind if you're snotty. If you have an issue, I'm here. ",
		answer:"tissues"
	},
	{
		question:"My other side is cool, and there's a good chance my cover's covered in drool. ",
		answer:"pillow"
	},
	{
		question:"I have teeth but no mouth. If a bald man carries me, it's only for memory's sake. ",
		answer:"comb"
	},
	{
		question:"Seeing double? Check me to spot your doppelganger. ",
		answer:"mirror"
	},
	{
		question:"I have eyes but cannot see. ",
		answer:"potato"
	},
	{
		question:"I have hands but cannot clap ",
		answer:"clock"
	}
]

function randomWord() {
  return programming_languages[Math.floor(Math.random() * programming_languages.length)]
}

export { randomWord }