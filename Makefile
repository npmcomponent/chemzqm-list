
build: components index.js
	@component build --dev
	@touch build

start:
	@component serve &

components: component.json
	@component install --dev

test:
	@mocha-phantomjs -R dot test/index.html

clean:
	rm -fr build components

.PHONY: clean start test
