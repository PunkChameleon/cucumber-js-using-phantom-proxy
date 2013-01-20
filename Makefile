cucumber:
	@NODE_ENV=test ./node_modules/.bin/cucumber.js ./features -r features/step_definitions -f pretty

npm:
	npm install

clean:
	find . -type f \( -name '*.sw*' -o -name '*~' \) -delete

