<?php
/**
 * ========= start via php ========= 
 * below generate private and public key from php
 */
$privateKey = openssl_pkey_new(
    array(
        'private_key_bits' => 2048
    )
);
openssl_pkey_export($privateKey, $get_priv_key);
echo '<pre>', print_r($get_priv_key,true),'</pre>'; // private key

$details = openssl_pkey_get_details($privateKey);
$publicKey = $details['key'];
echo '<pre>', print_r($publicKey, true),'</pre>'; // public key
/**
 * ========= end via php =========
 */

/**
 * simulate enc dec
 */

$string_original = "tulis sesuatu disini";
$enc = dataProcessing($get_priv_key,'enc',$string_original);
$dec = dataProcessing($publicKey,'dec',$enc);

echo '<pre>', print_r($enc,true),'</pre>'; // enc string
echo '<pre>', print_r($dec,true),'</pre>'; // dec string

function dataProcessing($key, $type, $payload){
    $type = strtolower($type);
    if($type == 'dec'){
        $pvt_msg = base64_decode($payload);
        openssl_public_decrypt( $pvt_msg, $pesanmitra, $key);
        return $pesanmitra;
    } else {
        openssl_private_encrypt($payload, $pvt_msg, $key);
        return base64_encode($pvt_msg);
    }
}
?>
