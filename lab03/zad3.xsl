<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0" indent="yes" doctype-system="about:legacy-compact" />
<xsl:template match="/">
    <html>
        <head>
            <title>Zad 03</title>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
            <link rel="stylesheet" type="text/css" href="styl.css"/>
        </head>
        <body>
            <table class="uczelnia" border="1">
                <xsl:for-each select="/uczelnia//wydzial">
                <xsl:sort select="nazwa/text()"/>
                    <xsl:call-template name="wydzial"/>
                </xsl:for-each>
            </table>
        </body>
    </html>
</xsl:template>


<xsl:template name="wydzial" >
    <tr><th class="nazwa" colspan="4"><xsl:value-of select="nazwa"/></th></tr>
    <xsl:for-each select="kierunek">
            <xsl:call-template name="kierunek"/>
    </xsl:for-each>
</xsl:template>

<xsl:template name="kierunek" >
    <tr><th class="kier_nazw" colspan="4"><xsl:value-of select="kier_nazw"/></th></tr>
        <tr>
            <th class="kier_nazw"><b>Numer</b></th>
            <th class="kier_nazw"><b>Imie</b></th>
            <th class="kier_nazw"><b>Nazwisko</b></th>
            <th class="kier_nazw"><b>Indeks</b></th>
        </tr>
        <xsl:for-each select="studenci">
        <xsl:sort select="nazwisko/text()"/>
            <xsl:call-template name="studenci"/>
        </xsl:for-each>

    
</xsl:template>

<xsl:template name="studenci" >
    <tr>
        <td><xsl:number value="position()" format="1 "/></td>
        <td><xsl:value-of select="imie" /></td>
        <td><xsl:value-of select="nazwisko" /></td>
        <td><xsl:value-of select="indeks" /></td>
    </tr>
</xsl:template>

</xsl:stylesheet>