#!/bin/sh
BASEDIR=$(dirname "$0")

echo "Building index.html..."

echo "> Curl CSS libraries"
echo ">> Curl normalize.css"

normalizecss=`curl https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.min.css`

echo "<<"
echo "<"

echo "> Curl JS libraries"
echo ">> Curl EventListener.js"

mkdir "$BASEDIR/tmp"
eventlistener_polyfill_js=`curl https://cdn.rawgit.com/jonathantneal/EventListener/9802db1401375b0989d80c395017c828acb9a200/EventListener.js`
echo "$eventlistener_polyfill_js" > "$BASEDIR/tmp/EventListener.js"

echo "<<"
echo "<"

echo "> Create source for index.html"
echo ">> Build CSS"

style="/*style.css*/$(cleancss "$BASEDIR/style.css" | autoprefixer-cli -o -)/*normalize.css*/$(echo "$normalizecss")"

echo "<<"

echo ">> Build JS"

script="$(uglifyjs -c -m -- "$BASEDIR/main.js" "$BASEDIR/tmp/EventListener.js")"
rm "$BASEDIR/tmp/EventListener.js"
rm -r "$BASEDIR/tmp/"

echo "<<"

echo ">> Edit skeleton.html source"

dev_only="s/BEGIN_DEV.*END_DEV//g"
style_dest="s@<style amp-custom>@<style amp-custom>$(echo "$style" | sed -e 's/[\/&]/\\&/g')@g"
script_dest="s@<script bundle>@<script>$(echo "$script" | sed -e 's/[\/&]/\\&/g')@g"
indexhtml=`sed -e "$style_dest" -e "$script_dest" -e "$dev_only" "$BASEDIR/skeleton.html"`

echo "<<"

echo ">> Create index.html"

echo "$indexhtml" > "$BASEDIR/../index.html"

echo "<<"
echo "<"

echo "Built index.html."
